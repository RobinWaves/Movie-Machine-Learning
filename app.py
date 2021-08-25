#import psycopg2
#import pandas as pd
from flask import Flask, render_template, redirect, request, url_for, make_response
import similarity
import time 
# Create an instance of Flask
app = Flask(__name__)

# Route to index.html template
@app.route("/")
def index():
  name = request.cookies.get('search')
  # Return index template
  time.sleep(1)
  return render_template("index.html", title=name)

# Route to similarity.py and function for ML and filter
@app.route("/similarity_scores", methods=['POST', 'GET'])
def similarity_scores():
  # Get the title
  if request.method == 'POST':  
    title = request.form['nm']
    # Define the name of movie
    name_of_movie = similarity.similarity(title)

  # Define the response
  title = title.title()
  resp = make_response(render_template('searched.html', title=title))
  resp.set_cookie('search', title)

  return resp

# Get cookies
@app.route('/getcookie')
def getcookie():
  name = request.cookies.get('search')
  return name

# Route to female focused
@app.route("/femalefocused")
def femalefocused():
  name = request.cookies.get('search')
  # Direct to femalefocused.html
  time.sleep(1)
  return render_template("femalefocused.html", title=name)

# Route to international
@app.route("/international")
def international():
  name = request.cookies.get('search')
  # Direct to international.html
  time.sleep(1)
  return render_template("international.html", title=name)

# Route to low budget
@app.route("/lowbudget")
def lowbudget():
  name = request.cookies.get('search')
  # Direct to lowbudget.html
  time.sleep(1)
  return render_template("lowbudget.html", title=name)

if __name__ == "__main__":
  app.run(debug=True)