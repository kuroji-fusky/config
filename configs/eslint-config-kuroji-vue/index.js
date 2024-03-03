/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@kuro-utils/base", "plugin:vue/vue3-recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "vue/component-api-style": ["error", ["script-setup"]],

    "vue/no-empty-component-block": "warn",
    "vue/block-order": [
      "warn",
      {
        order: [["script", "template"], "style"]
      }
    ],
    "vue/html-button-has-type": ["warn", { button: false }],
    "vue/no-unsupported-features": ["error", { version: "^2.6.0" }],
    "vue/require-explicit-slots": "error",
    "vue/no-template-target-blank": "error",
    "vue/no-undef-properties": "error",
    "vue/padding-line-between-blocks": "error",
    "vue/v-on-handler-style": "error",
    "vue/no-multiple-objects-in-class": "error"
  }
}
