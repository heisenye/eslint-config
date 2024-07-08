import { Linter } from "eslint"
import { javascript, typescript, prettier, node } from "./configs"
import { GLOB_DIST } from "./globs"

interface ConfigOptions {
  globalIgnores?: string[]
  userConfig?: Linter.FlatConfig
}

export function config(options: ConfigOptions = {}) {
  const configs: Linter.FlatConfig[] = []
  const { userConfig } = options

  // default ignores are listed here
  // {
  //   ignores: [
  //     "**/node_modules/",
  //     ".git/"
  //   ]
  // }
  const { globalIgnores: ignores = [GLOB_DIST] } = options

  configs.push(...javascript(), ...typescript(), ...prettier(), ...node(), {
    ignores,
  })

  if (userConfig) {
    configs.push(userConfig)
  }

  return configs
}
