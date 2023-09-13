from typing import Optional

from bs4 import BeautifulSoup
from requests import Session


class KuroSoup:
    def __init__(self, url: str):
        self._url = url

        rs = Session().get(self._url)
        self._document = BeautifulSoup(rs.text, "html.parser")

        return {
            "status_code": rs.status_code(),
            "document": self._document,
        }

    def select(self, selector: str, parse_text: Optional[bool] = False):
        if not parse_text:
            return self._document.select_one(selector)

        return self._document.select_one(selector).text

    def select_all(self, selector: str, parse_text: Optional[bool] = False):
        el_texts = []
        bs4_el = self._document.select(selector)

        for el in bs4_el:
            el_texts.append(el.text)

        if not parse_text:
            return bs4_el

        return el_texts
