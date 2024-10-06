import { Linter } from "eslint"
import { GLOB_TS } from "../globs"
import ts from "typescript-eslint"
import typescriptParser from "@typescript-eslint/parser"
import globals from "globals"

export function typescript() {
  const tsConfig = (ts.configs.recommended as Linter.Config[]).map((config) => {
    return {
      files: [GLOB_TS],
      ...config,
    }
  })

  return [
    {
      files: [GLOB_TS],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
          NodeJS: false,
        },
        sourceType: "module",
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
    ...(tsConfig as Linter.FlatConfig[]),
  ] satisfies Linter.FlatConfig[]
}
