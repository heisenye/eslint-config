import { Linter } from "eslint"
import { GLOB_TS_VARIANTS } from "../globs"
import ts from "typescript-eslint"
import typescriptParser from "@typescript-eslint/parser"
import globals from "globals"

export function typescript() {
  const tsConfig = (ts.configs.recommended as Linter.Config[]).map((config) => {
    return {
      files: [GLOB_TS_VARIANTS],
      ...config,
    }
  })

  return [
    {
      files: [GLOB_TS_VARIANTS],
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
    },
    ...(tsConfig as Linter.Config[]),
  ] satisfies Linter.Config[]
}
