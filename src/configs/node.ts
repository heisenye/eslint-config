import { Linter } from "eslint"
import nodePlugin from "eslint-plugin-n"
import { GLOB_CJS, GLOB_MJS, GLOB_JS, GLOB_TS, GLOB_JSX } from "../globs"
import { type } from "../utils"

export function node() {
  return [
    {
      files: [GLOB_TS],
      ...nodePlugin.configs["flat/recommended-module"],
      ...nodePlugin.configs["flat/recommended-script"],
    },
    {
      files: [GLOB_MJS],
      ...nodePlugin.configs["flat/recommended-module"],
    },
    {
      files: [GLOB_CJS],
      ...nodePlugin.configs["flat/recommended-script"],
    },
    type === "commonjs"
      ? {
          files: [GLOB_JS, GLOB_JSX],
          ...nodePlugin.configs["flat/recommended-script"],
        }
      : {
          files: [GLOB_JS, GLOB_JSX],
          ...nodePlugin.configs["flat/recommended-module"],
        },
  ] satisfies Linter.FlatConfig[]
}
