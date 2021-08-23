#import psycopg2
#import pandas as pd
from flask import Flask, render_template, redirect, request, url_for
import similarity

# Create an instance of Flask
app = Flask(__name__)

# Route to index.html template
@app.route("/")
def index():
  # Return index template
  return render_template("index.html")

# Route to similarity.py and function for ML and filter
@app.route("/similarity_scores", methods=['POST'])
def similarity_scores():
  name_of_movie = request.form['chosenTitle']
  similarity.similarity(name_of_movie)
  #results = filtered_similar.to_json(orient="records")
  return redirect("/")

# Route to female focused
@app.route("/femalefocused")
def femalefocused():
  # Direct to femalefocused.html
  return render_template("femalefocused.html")

# Route to international
@app.route("/international")
def international():
  # Direct to international.html
  return render_template("international.html")

# Route to low budget
@app.route("/lowbudget")
def lowbudget():
  # Direct to lowbudget.html
  return render_template("lowbudget.html")

if __name__ == "__main__":
  app.run(debug=True)