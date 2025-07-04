import { Linter } from "eslint"
import { GLOB_JS_TS } from "../utils"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"

export function prettier(): Linter.Config[] {
  return [
    {
      name: "prettier/recommended",
      files: [...GLOB_JS_TS],
      ...eslintPluginPrettier,
    },
  ]
}
