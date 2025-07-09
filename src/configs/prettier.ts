import { Linter } from "eslint"
import { GLOB_JS_TS } from "../utils"
import prettierPlugin from "eslint-plugin-prettier/recommended"

export function prettier(): Linter.Config[] {
  return [
    {
      ...prettierPlugin,
      name: "prettier/recommended",
      files: [...GLOB_JS_TS],
      rules: {
        ...prettierPlugin.rules,
        "no-unexpected-multiline": "error",
      },
    },
  ]
}
