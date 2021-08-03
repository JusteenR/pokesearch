import time
import requests
from bs4 import BeautifulSoup
import re
from controller import generateWords

from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/<pokemonType>')
def getType(pokemonType):
    return generateWords(pokemonType)

if __name__ == "__main__":
    app.run(debug=True)