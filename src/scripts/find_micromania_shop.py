# -*- coding: utf-8 -*-

"""
Script that get all micromania shop and return the result in a json file.
"""

import ast
import re

import requests
from lxml import html

COORD_REGEX = re.compile(r"([0-9]+\.[0-9]{8})")

def main():
    url = "https://www.micromania.fr/liste-magasins-micromania.html"
    response = requests.get(url)
    tree = html.fromstring(response.content)
    # get div with shop listing
    shop_elem_list = tree.xpath('//div[@class="full-list"]/div/a')
    # Get shop name and url
    shop_list = [
        get_shop_information(a.get('href').strip(), a.text)
        for a in shop_elem_list
    ]


def get_shop_information(url, name):
    """ Take a shop url and return shop information.
    """
    response = requests.get(url)
    tree = html.fromstring(response.content)
    # get address informations
    address = tree.xpath('//li[@class="address"]/text()')
    address = [line.strip() for line in address]
    # extract zipcode and city
    zipcode, city = address.pop().split(None, 1)
    # get coords from scripts sections
    scripts_gmap = tree.xpath('//div[@class="col-main"]/script')[0]
    lat = lon = None
    for line in scripts_gmap.text.split('\n'):
        if COORD_REGEX.search(line):
            lat, lon = get_coord(line, address[0])
    return {
        'name': name,
        'address': ', '.join(address),
        'zipcode': zipcode,
        'city': city,
        'coords': {
            'lon': lon,
            'lat': lat,
        },
    }


def get_coord(line, shop_name):
    """ Get coordinate position from a javascript line.
    """
    gmap_shop_list = ast.literal_eval(line.strip())[0]
    for text, *coord, __ in gmap_shop_list:
        if text.find(shop_name) != -1:
            return coord
    # some shop do not have coord like Beaugrenelle
    return None


if __name__ == "__main__":
    main()
