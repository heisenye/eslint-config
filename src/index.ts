import { Linter } from "eslint"
import { javascript, typescript, prettier, node, preset } from "./configs"
import { DEFAULT_IGNORES } from "./utils"
import type { ConfigOptions } from "./utils"

export function createConfig({
  ecmaVersion = "latest",
  jsx = false,
  environment = "node",
  javascriptRules = {},
  typescriptRules = {},
  typeChecking = false,
  presetOptions = {},
  globalIgnores = [],
  userConfigs = [],
}: ConfigOptions = {}) {
  const configs: Linter.Config[] = []

  configs.push({
    name: "ignores/global",
    ignores: [...DEFAULT_IGNORES, ...globalIgnores],
  })

  configs.push(
    javascript({ ecmaVersion, jsx, rules: javascriptRules }),
    ...typescript({ ecmaVersion, jsx, rules: typescriptRules, typeChecking }),
    ...prettier(),
  )

  configs.push(...node({ browser: environment === "browser" }))

  configs.push(...preset(presetOptions))

  configs.push(...userConfigs)

  return configs
}
