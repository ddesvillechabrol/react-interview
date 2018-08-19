# -*- coding: utf-8 -*-

"""
Script that get all micromania shop and return the result in a json file.
"""

import ast
import json
import re
from itertools import islice

import click
import requests
from lxml import html

import logging

handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter(
    "%(asctime)s - %(levelname)-8s %(message)s",
    "%Y-%m-%d %H:%M:%S"
))
logger = logging.getLogger(__name__)
logger.setLevel('INFO')
logger.addHandler(handler)

API_KEY = "AIzaSyAg7KEmDqTH43EVRswL9Jfi-l3qjeM-HoA"
COORD_REGEX = re.compile(r"([0-9]+\.[0-9]{8})")
EMPTY_LINE = re.compile(r"^\s+$")


@click.command(
    context_settings={'help_option_names': ['-h', '--help']}
)
@click.option(
    '-o', '--output',
    type=click.Path(),
    metavar='OUTPUT',
    nargs=1,
    default='micromania_shop.json',
    help="Output JSON filename."
)
@click.option(
    '-n', '--number',
    type=int,
    metavar='INT',
    nargs=1,
    default=50,
    help="Limit of shop request by script."
)
def main(output, number):
    url = "https://www.micromania.fr/liste-magasins-micromania.html"
    response = requests.get(url)
    tree = html.fromstring(response.content)
    # get div with shop listing
    shop_elem_list = tree.xpath('//div[@class="full-list"]/div/a')
    # Get shop name and url
    shop_list = [
        get_shop_information(a.get('href').strip(), a.text)
        for a in islice(shop_elem_list, number)
    ]
    with open(output, 'w') as filout:
        print(json.dumps(shop_list, indent=2), file=filout)


def get_shop_information(url, name):
    """ Take a shop url and return shop information.
    """
    response = requests.get(url)
    tree = html.fromstring(response.content)
    # get address informations
    address = tree.xpath('//li[@class="address"]/text()')
    address = [line.strip() for line in address if not EMPTY_LINE.search(line)]
    # get coords from scripts sections
    scripts_gmap = tree.xpath('//div[@class="col-main"]/script')[0]
    lat = lon = None
    for line in scripts_gmap.text.split('\n'):
        if COORD_REGEX.search(line):
            lat, lon = get_coord_from_script(line, address)
    if not lat:
        lat, lon = get_coord_from_gmap(address)
    # extract zipcode and city
    zipcode, city = address.pop().split(None, 1)
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


def get_coord_from_script(line, address):
    """ Get coordinate position from a javascript line.
    """
    map_shop_list = ast.literal_eval(line.strip())[0]
    shop_name = address[0]
    for text, *coord, __ in map_shop_list:
        if text.find(shop_name) != -1:
            return coord
    return None, None


def get_coord_from_gmap(address):
    """ Get coordinate using google map api.
    """
    # some shop do not have coord like Beaugrenelle
    gmap = "+".join(",+".join(address).split())
    response = requests.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address="
        + gmap + "&key=" + API_KEY
    )
    json_resp = response.json()
    try:
        location = json_resp['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    except IndexError as e:
        logger.error("There are a problem with the google API key.")
        return None, None


if __name__ == "__main__":
    main()
