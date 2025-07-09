import type { Linter } from "eslint"
import ts from "typescript-eslint"
import type { TSESLint } from "@typescript-eslint/utils"
import typescriptParser from "@typescript-eslint/parser"
import { GLOB_TS_VARIANTS, conditionalConfigs, mergeRules } from "../utils"
import type { TypeScriptOptions } from "../utils"

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
  const { typeChecking, jsx, typescriptRules } = options

  const tsConfigs = (ts.configs.recommended as Linter.Config[]).flatMap(
    (config) => (config.rules ? [config.rules] : []),
  )

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
            tsconfigRootDir: options.tsconfigRootDir,
          }),
        } satisfies TSESLint.FlatConfig.LanguageOptions["parserOptions"],
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      rules: mergeRules(...tsConfigs, DEFAULT_RULES, typescriptRules),
    },
    Object.assign(
      {},
      ...conditionalConfigs(
        typeChecking,
        typeCheckConfig.map((config) => ({
          ...config,
          name: "typescript/type-check",
          files: [...GLOB_TS_VARIANTS],
        })),
      ),
    ) as Linter.Config,
  ]
}
