import { Linter } from "eslint"
import { GLOB_JS_VARIANTS, GLOB_JS_TS, GLOB_MJS, GLOB_CJS } from "../globs"
import js from "@eslint/js"
import globals from "globals"

export function javascript() {
  return [
    {
      files: [GLOB_JS_VARIANTS],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
        },
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
    {
      files: [GLOB_CJS],
      languageOptions: {
        sourceType: "commonjs",
      },
    },
    {
      files: [GLOB_MJS],
      languageOptions: {
        sourceType: "module",
      },
    },
    {
      files: [GLOB_JS_TS],
      ...js.configs.recommended,
    },
  ] satisfies Linter.Config[]
}
