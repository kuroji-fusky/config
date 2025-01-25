from typing import Iterable, TypeVar
from itertools import chain

LT = TypeVar("LT")


def flatten_list(list_item: Iterable[Iterable[LT]]) -> list[LT]:
    # chain.from_iterable is considered to be more efficent when squishing lists
    # compared to nested list comprehensions and `sum(list_item, [])`
    return list(chain.from_iterable(list_item))
