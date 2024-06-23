import type { Linter } from "eslint"
import prettierPlugin from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"
import nodePlugin from "eslint-plugin-n"

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

export function config(...configs: Linter.FlatConfig[]): Linter.FlatConfig[] {
  const mergedConfig = configs.reduce((acc, config) => {
    return {
      ...acc,
      ...config,
      files: [...((acc.files as string[]) || []), ...(config?.files || [])],
      rules: {
        ...acc?.rules,
        ...config?.rules,
      },
      plugins: {
        ...acc?.plugins,
        ...config?.plugins,
      },
    } satisfies Linter.FlatConfig
  }, defaultConfig)

  return [
    mergedConfig,
    prettierPlugin,
    nodePlugin.configs["flat/recommended-script"],
  ]
}
