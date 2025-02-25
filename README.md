# Kuro Shared Utils

An assortment of configs I've written from scratch and in use for projects I work on!

## Directory listing

- `js`
  - `types` - Custom types mostly tailored for DOM and React stuff
- `python`
  - [`kuro_fs`](/python/kuro_fs/): Dealing with the file system, including glob support
  - [`kuro_scraper`](/python/kuro_scraper/): Add the usual BeautifulSoup and requests lib

## Usage

Since I have no plans to publish this to the npm registry, you'll need to add this repo as a
submodule and is best fitted for a monorepo setup.

```console
git submodule add https://github.com/kuroji-fusky/shared-utils.git path/to/shared-utils/
```
