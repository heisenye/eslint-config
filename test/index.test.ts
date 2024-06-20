import { describe, it, expect } from "vitest"
import { config } from "../dist/index.mjs"
import { Linter } from "eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"

describe("function config", () => {
  it("should merge user config with default config", () => {
    const userConfig: Linter.FlatConfig = {
      files: ["**/*.vue"],
      rules: {
        "no-unuesd-vars": "error",
      },
    }

    const expectedConfig = [
      {
        files: ["**/*.{js,ts}", "**/*.vue"],
        languageOptions: {
          parser: typescriptParser,
        },
        rules: {
          "no-unuesd-vars": "error",
          "prettier/prettier": [
            "error",
            {
              semi: false,
            },
          ],
        },
      } satisfies Linter.FlatConfig,
      eslintPluginPrettier,
    ]

    const result = config(userConfig)
    expect(result).toEqual(expectedConfig)
  })
})
