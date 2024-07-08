import { Linter } from "eslint"
import { GLOB_ALL_JS, GLOB_JS_TS, GLOB_MJS, GLOB_CJS, GLOB_JS } from "../globs"
import js from "@eslint/js"
import globals from "globals"
import { type } from "../utils"

export function javascript() {
  return [
    {
      files: [GLOB_ALL_JS],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
        },
        sourceType: type,
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
      name: "heisenye/javascript/setup",
    },
    {
      files: [GLOB_CJS],
      languageOptions: {
        sourceType: "commonjs",
      },
      name: "heisenye/commonjs/setup",
    },
    {
      files: [GLOB_MJS],
      languageOptions: {
        sourceType: "module",
      },
      name: "heisenye/esm/setup",
    },
    {
      files: [GLOB_JS_TS],
      ...js.configs.recommended,
    },
  ] satisfies Linter.FlatConfig[]
}
