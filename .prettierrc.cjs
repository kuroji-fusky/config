module.exports = {
  ...require("@kuro-utils/prettier"),
  overrides: [
    {
      files: ["./types/DOM.ts", "./types/Partials.ts"],
      options: {
        printWidth: 120
      }
    }
  ]
}
