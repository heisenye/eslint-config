import { describe, it, expect } from "vitest"
import { config } from "../src/index.js"
import { Linter } from "eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"
import nodePlugin from "eslint-plugin-n"

describe("function config", () => {
  it("should merge user configs with default config", () => {
    const userConfig: Linter.FlatConfig = {
      files: ["**/*.vue"],
      rules: {
        "no-unused-vars": "error",
      },
    }

    const expectedConfig = [
      {
        files: ["**/*.{js,ts}", "**/*.vue"],
        languageOptions: {
          parser: typescriptParser,
        },
        rules: {
          "no-unused-vars": "error",
          "prettier/prettier": [
            "error",
            {
              semi: false,
            },
          ],
        },
        plugins: {},
      } satisfies Linter.FlatConfig,
      eslintPluginPrettier,
      nodePlugin.configs["flat/recommended-script"],
    ]

    const result = config(userConfig)
    expect(result).toEqual(expectedConfig)
  })
})
