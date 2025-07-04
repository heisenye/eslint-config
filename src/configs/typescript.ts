import type { Linter } from "eslint"
import ts from "typescript-eslint"
import type { TSESLint } from "@typescript-eslint/utils"
import typescriptParser from "@typescript-eslint/parser"
import { GLOB_TS_VARIANTS, conditionalConfigs, mergeRules } from "../utils"
import type { TypeScriptOptions } from "../utils"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

const DEFAULT_RULES: Linter.RulesRecord = {
  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-unused-vars": "off",
  "no-unused-expressions": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      vars: "all",
      args: "after-used",
      caughtErrors: "none",
      ignoreRestSiblings: true,
    },
  ],
  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
      ignoreDirectives: true,
    },
  ],
}

export function typescript(options: TypeScriptOptions = {}): Linter.Config[] {
  const { typeChecking = false, jsx = false, rules: customRules = {} } = options

  const baseConfig = ts.configs.recommended as Linter.Config[]
  const typeCheckConfig = typeChecking
    ? (ts.configs.recommendedTypeChecked as Linter.Config[])
    : []

  return [
    {
      name: "typescript/base",
      files: [...GLOB_TS_VARIANTS],
      languageOptions: {
        sourceType: "module",
        parser: typescriptParser,
        ecmaVersion: "latest",
        parserOptions: {
          ecmaFeatures: {
            jsx,
          },
          ...(typeChecking && {
            project: true,
            tsconfigRootDir: fileURLToPath(dirname(import.meta.url)),
          }),
        } satisfies TSESLint.FlatConfig.LanguageOptions["parserOptions"],
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
    ...baseConfig.map((config) => ({
      ...config,
      name: config.name ? `typescript/${config.name}` : "typescript/base",
      files: [...GLOB_TS_VARIANTS],
    })),
    ...conditionalConfigs(
      typeChecking,
      typeCheckConfig.map((config) => ({
        ...config,
        name: config.name
          ? `typescript/${config.name}`
          : "typescript/type-check",
        files: [...GLOB_TS_VARIANTS],
      })),
    ),
    {
      name: "typescript/base",
      files: [...GLOB_TS_VARIANTS],
      rules: mergeRules(DEFAULT_RULES, customRules),
    },
  ]
}
