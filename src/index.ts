import { Linter } from "eslint"
import { javascript, typescript, prettier, node } from "./configs"
import { GLOB_ALL_JS, GLOB_DIST, GLOB_TS } from "./globs"

interface ConfigOptions {
  globalIgnores?: string[]
  userConfig?: Linter.FlatConfig
  useBundle?: boolean
  ifPublish?: boolean
}

export function config(options: ConfigOptions = {}) {
  const configs: Linter.FlatConfig[] = []
  const { userConfig, useBundle, ifPublish } = options

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

  if (useBundle) {
    configs.push({
      files: [GLOB_TS, GLOB_ALL_JS],
      rules: {
        "n/no-missing-import": "off",
        "n/no-missing-require": "off",
      },
    })
  }

  if (!ifPublish) {
    configs.push({
      files: [GLOB_TS, GLOB_ALL_JS],
      rules: {
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
      },
    })
  }

  return configs
}
