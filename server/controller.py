import time
import requests
from bs4 import BeautifulSoup
import re
import random

from flask import Flask, jsonify

def generateWords(pokemonType, pokemonName):
    url = 'https://www.merriam-webster.com/thesaurus/' + pokemonType
    r   = requests.get(url, headers={'User-Agent':'Mozilla/5.0'})
    soup = BeautifulSoup(r.content, 'html5lib')
    divs = soup.find_all('div', class_='synonyms_list')
    res = []
    for i in divs:
        # Omits the antonyms
        if i.find(class_='near-list'):
            continue
        if i.find(class_='anti-list'):
            continue
        entry = i.find_all('a')
        for s in entry:
            if s.text != 'holocaust':
                word = re.search('^[a-zA-Z]+$', s.text)
                if word:
                    ans = word.group()
                    res.append(ans[:6])
    # Chose random ordering
    randomOrder = random.randint(0,1)

    #Filter out dashes in pokemon name for mega
    pokemonName = pokemonName.split('-')[0]
    if randomOrder == 0:
        prefix = chooseRandomWord(res)
        suffix = cutName(pokemonName, randomOrder)
    else:
        prefix = cutName(pokemonName, randomOrder)
        suffix = chooseRandomWord(res)
    return jsonify(results=(prefix+suffix).capitalize())

def chooseRandomWord(synonyms):
    # Choose random word
    randomIndex = random.randint(0, len(synonyms) - 1)

    # Cut it to be either 3 or 6 characters long
    randomLength = random.randint(3, 6)

    # Check if random length is less than the total length of
    if randomLength >= len(synonyms[randomIndex]):
        return synonyms[randomIndex]
    return synonyms[randomIndex][:randomLength]

def cutName(pokemonName, randomOrder):
    # Cut it to be either 3 or 6 characters long
    randomLength = random.randint(3, 6)
    if randomOrder == 1:
        return pokemonName[:randomLength]
    else:
        if randomLength < len(pokemonName):
            return pokemonName[randomLength:]
        else:
            pokemonName