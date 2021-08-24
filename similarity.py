from app import lowbudget
import pandas as pd
import os

#To set up similarity matrix
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#Could perform train_test_split and metrics.accuracy_score test if needed.   
#from sklearn.model_selection import train_test_split
#from sklearn.svm import SVC 
#from sklearn import metrics

def similarity(name_of_movie):
  #import csv
  df = pd.read_csv("./data_cleaning/export/movie_db.csv")

  #set up new dataframe
  features = df[['index','title','release_date','cast','total_top_5_female_led','total_female_actors','percentage_female_cast','international','original_language','languages','genres','budget','budget_bins','popularity','tagline','keywords','production_companies','production_company_origin_country']]

  #create combined_features row for similarity matrix
  def combine_features(row):
    return row['cast']+" "+row['keywords']+" "+row['genres']+" "+row['tagline']+" "+row['production_companies']+" "+row['production_company_origin_country']

  for feature in features:
    features = features.fillna('')
    features['combined_features'] = features.apply(combine_features, axis=1)

  #create new CountVectorizer matrix
  cv = CountVectorizer()
  count_matrix = cv.fit_transform(features['combined_features'])

  #obtain cosine similarity matrix from the count matrix
  cosine_sim = cosine_similarity(count_matrix)

  #get movie title from movie index and vice-versa
  def get_title_from_index(index):
    return features[features.index == index]["title"].values[0]
  def get_index_from_title(title):
    return features[features.title == title]["index"].values[0]

  #find similarity scores for given movie and then enmerate over it.
  movie_user_likes = name_of_movie #"Toy Story 3"
  movie_index = get_index_from_title(movie_user_likes)
  similar_movies = list(enumerate(cosine_sim[movie_index])) 
  similar_movies

  #Sort the list similar_movies accroding to similarity scores in descending order. Since the most similar movie to a given movie is itself, discard the first elements after sorting movies.
  sorted_similar_movies = sorted(similar_movies, key=lambda x:x[1], reverse=True)[1:]

  # Create similarity df
  similarity_df = pd.DataFrame(similar_movies, columns=["index", "similarity_score"])
  similarity_df.set_index("index", inplace=True)

  # Merge original dataframe with similarity dataframe
  #merged_df = pd.merge(similarity_df, df)
  #merged_df.sort_values(by="similarity_score", ascending=False, inplace=True)
  joined_df = df.join(similarity_df, how='outer')
  
  try:
    os.remove("./static/data/nofilterdata.js")
    print("nofilterdata.js has been removed")
    os.remove("./static/data/femaledata.js")
    print("femaledata.js has been removed")
    os.remove("./static/data/intldata.js")
    print("intldata.js has been removed")
  except:
    print("No data files to remove")
  
  # No filter 
  nofilter = joined_df.sort_values(by="similarity_score", ascending=False)
  topnofilter = nofilter.iloc[1:21:1].to_json(orient="records")
  f = open("./static/data/nofilterdata.js", "w")
  f.write("var data = ")
  f.write(topnofilter)
  f.close()

  # Female-Led
  # Change "percentage_female_directed" to "percentage_female_led" (once updated csv is pushed)
  female_led = joined_df.sort_values(by=["percentage_female_directed", "similarity_score"], ascending=False)
  top_fem = female_led[:20].to_json(orient="records")
  f = open("./static/data/femaledata.js", "w")
  f.write("var data = ")
  f.write(top_fem)
  f.close()

  # International
  international = joined_df.sort_values(by=["international", "similarity_score"], ascending=False)
  top_intl = international[:20].to_json(orient="records")
  f = open("./static/data/intldata.js", "w")
  f.write("var data = ")
  f.write(top_intl)
  f.close()

  # Low-Budget
  low_budget = joined_df.loc[joined_df["budget_bins"] == "0 to 15m"].copy()
  low_budget = low_budget.sort_values(by=["similarity_score"], ascending=False)
  top_lowbudget = low_budget[:20]

  #return female_led