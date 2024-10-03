# Kuro Utils

An assortment of configs I've written from scratch and in use for projects I work on!

## Inside Da Box

- `types` - Custom types mostly tailored for DOM and React stuff

## Usage

Since I have no plans to publish this to the npm registry, you'll need to add this repo as a
submodule and is best fitted for a monorepo setup.

```console
git submodule add https://github.com/kuroji-fusky/kuro-utils utils/
```

### Monorepo setup

If you're using Yarn workspaces, you can specify what you'll need. In most cases, you'll need
the whole config folder because you're cool like me 😎

```json
{
  "workspaces": ["utils/config/**"]
}
```
