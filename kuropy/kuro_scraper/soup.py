from bs4 import BeautifulSoup
import requests

rs = requests.Sessions()


def kuro_soup(url):
    _req_fallback = rs.get(url)

    return BeautifulSoup(_req_fallback, "html.parser", from_encoding="utf-8")
