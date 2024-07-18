import { Linter } from "eslint"
import { GLOB_TS } from "../globs"
import typescriptParser from "@typescript-eslint/parser"
import globals from "globals"

export function typescript() {
  return [
    {
      files: [GLOB_TS],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
        },
        parser: typescriptParser,
        ecmaVersion: "latest",
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: "heisenye/typescript/setup",
    },
  ] satisfies Linter.FlatConfig[]
}
