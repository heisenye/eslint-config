import type { Linter } from "eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"

const defaultConfig: Linter.FlatConfig = {
  files: ["**/*.{js,ts}"],
  languageOptions: {
    parser: typescriptParser,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false,
      },
    ],
  },
}

export function config<T extends Linter.FlatConfig = Linter.FlatConfig>(
  config?: T,
) {
  return [
    {
      ...defaultConfig,
      ...config,
      files: [...(defaultConfig.files as string[]), ...(config?.files || [])],
      rules: {
        ...defaultConfig.rules,
        ...config?.rules,
      },
    } satisfies Linter.FlatConfig,
    eslintPluginPrettier,
  ]
}
