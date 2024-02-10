module.exports = {
  ...require("@kuro-utils/prettier"),
  overrides: [
    {
      files: ["./types/DOM.ts"],
      options: {
        printWidth: 130
      }
    }
  ]
}
