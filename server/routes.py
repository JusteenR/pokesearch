import time
import requests
from bs4 import BeautifulSoup
import re
from controller import generateWords

from flask import Flask, jsonify, request


app = Flask(__name__)

@app.route('/synonyms')
def getType():
    pokemonType = request.args.get('pokemonType', None)
    if (pokemonType == "dragon"):
        pokemonType = "fantasy"
    pokemonName = request.args.get('pokemonName', None)
    return generateWords(pokemonType, pokemonName)

if __name__ == "__main__":
    app.run(debug=True)