import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"
import nodePlugin from "eslint-plugin-n"

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
const config = {
  files: ["**/*.{ts,js}"],
  languageOptions: {
    parser: typescriptParser
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false
      }
    ]
  },
  ignores: [
    "./dist/"
  ]
}

export default [
  config,
  eslintPluginPrettier,
  nodePlugin.configs["flat/recommended-script"]
]