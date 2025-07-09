import { Linter } from "eslint"
import { javascript, typescript, prettier, node, preset } from "./configs"
import { DEFAULT_IGNORES } from "./utils"
import type { ConfigOptions } from "./utils"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

export function createConfig({
  ecmaVersion = "latest",
  jsx = false,
  environment = "node",
  javascriptRules = {},
  typescriptRules = {},
  typeChecking = false,
  tsconfigRootDir = fileURLToPath(dirname(import.meta.url)),
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
    javascript({ ecmaVersion, jsx, javascriptRules }),
    ...typescript({
      ecmaVersion,
      jsx,
      typescriptRules,
      typeChecking,
      tsconfigRootDir,
    }),
    ...prettier(),
  )

  configs.push(...node({ browser: environment === "browser" }))

  configs.push(...preset(presetOptions))

  configs.push(...userConfigs)

  return configs
}
