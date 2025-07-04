import type { Linter } from "eslint"
import js from "@eslint/js"
import { GLOB_JS_VARIANTS, mergeRules } from "../utils"
import type { JavaScriptOptions } from "../utils"

const DEFAULT_RULES: Linter.RulesRecord = {
  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-unused-vars": [
    "error",
    {
      vars: "all",
      args: "after-used",
      caughtErrors: "none",
      ignoreRestSiblings: true,
    },
  ],
  "no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
      ignoreDirectives: true,
    },
  ],
}

export function javascript(options: JavaScriptOptions = {}): Linter.Config {
  const {
    ecmaVersion = "latest",
    jsx = false,
    rules: customRules = {},
  } = options
  const jsRules = js.configs.recommended.rules
  return {
    name: "javascript/base",
    files: [...GLOB_JS_VARIANTS],
    languageOptions: {
      ecmaVersion: ecmaVersion,
      parserOptions: {
        ecmaFeatures: {
          jsx,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: mergeRules(jsRules, DEFAULT_RULES, customRules),
  }
}
