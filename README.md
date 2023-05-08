# KuroSoup 🍲

A simple, tiny Python library that's made specifically to abstract web
scraping and parsing with the help of Beautiful Soup and requests with minimal code footprint!

## Installation

Installing the library is by cloning this repository and importing the library like so:

```py
import KuroSoup
```

(No pip support yet, sorry!)

## Using the thing

Provide the URL from the main `KuroSoup` class:

```py
import KuroSoup

ks = KuroSoup("https://kurojifusky.com/")
```

There are only two methods, you can select one element with `.select()` or all
elements with `select_all()`. Both methods have two parameters, one for grabbing
the elements using CSS selectors only and a boolean for only parsing text.

## Examples

```py
output = ks.select("p")
output_text_only = ks.select("p", parse_text=True)

print(output)
# <p><!--[-->The site is currently under construction; because it's no secret writing and maintaining a website
# entirely by code is difficult! (and painful too)<!--]--></p>

print(output_text_only)
# The site is currently under construction; because it's no secret writing and maintaining a website
# entirely by code is difficult! (and painful too)
```

```py
output_all = ks.select_all('p')
# [ <array of paragraph tags> ]
```
