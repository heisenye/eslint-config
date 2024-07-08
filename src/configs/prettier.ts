import { Linter } from "eslint"
import { GLOB_JS_TS } from "../globs"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"

export function prettier() {
  return [
    {
      files: [GLOB_JS_TS],
      ...eslintPluginPrettier,
      name: "heisenye/prettier/rules",
    },
  ] satisfies Linter.FlatConfig[]
}
