module.exports = {
  ...require("@kuro-utils/prettier"),
  overrides: [
    {
      files: ["./types/*.ts", "./config/tailwind/index.ts"],
      options: {
        printWidth: 120
      }
    },
    {
      files: ["./configs/eslint-config-kuroji/*.js"],
      options: {
        printWidth: 75
      }
    }
  ]
}
