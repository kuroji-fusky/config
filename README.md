# Kuro Utils

An assortment of configs I've written from scratch and in use for projects I work on!

## Inside Da Box

- `configs`
  - [`eslint-config-kuroji`](/configs/eslint-config-kuroji/) - My base ESLint config
  - [`eslint-config-kuroji`](/configs/eslint-config-kuroji/) - My Vue ESlint config, which extends to the base
  - [`prettier`](/configs/prettier/) - Simple prettier config
  - [`tailwind`](/configs/tailwind/) - Tailwind CSS config that extends radial gradients and stuff
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

```jsonc
{
  "workspaces": ["utils/config/**"]
}
```

### Extending a Prettier config

You can "extend" a Prettier config by using a JS config file as there's no support to extend another config with `.prettierrc.json` unfortunately.

```js
module.exports = require("@kuro-utils/prettier")
```

Use the **s p r e a d** syntax to override a setting from the base config:

```js
module.exports = {
  ...require("@kuro-utils/prettier"),
  semi: true,
}
```
