from typing import Iterable, TypeVar
from itertools import chain

_ListType = TypeVar("_ListType")


def flatten_list(list_item: Iterable[Iterable[_ListType]]) -> list[_ListType]:
    # chain.from_iterable is considered to be more efficent when squishing lists
    # compared to nested list comprehensions and `sum(list_item, [])`
    return list(chain.from_iterable(list_item))
