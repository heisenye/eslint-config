import { Linter } from "eslint"
import nodePlugin from "eslint-plugin-n"
import { GLOB_CJS, GLOB_MJS, GLOB_JS, GLOB_JSX, GLOB_TS } from "../globs"

export function node() {
  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS],
      ...nodePlugin.configs["flat/recommended"],
    },
    {
      files: [GLOB_MJS],
      ...nodePlugin.configs["flat/recommended-module"],
    },
    {
      files: [GLOB_CJS],
      ...nodePlugin.configs["flat/recommended-script"],
    },
  ] satisfies Linter.FlatConfig[]
}
