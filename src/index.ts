import { Linter } from "eslint"
import { javascript, typescript, prettier, node } from "./configs"
import { GLOB_JS_VARIANTS, GLOB_DIST, GLOB_TS_VARIANTS } from "./globs"

interface ConfigOptions {
  globalIgnores?: string[]
  userConfig?: Linter.Config
  allowMissingModules?: boolean
  allowUnpublishedModules?: boolean
}

export function config({
  globalIgnores = [GLOB_DIST],
  userConfig,
  allowMissingModules = true,
  allowUnpublishedModules = true,
}: ConfigOptions = {}) {
  const configs: Linter.Config[] = []

  configs.push({
    ignores: globalIgnores,
  })

  configs.push(...javascript(), ...typescript(), ...prettier(), ...node())

  if (userConfig) {
    configs.push(userConfig)
  }

  if (allowMissingModules) {
    configs.push({
      files: [GLOB_TS_VARIANTS, GLOB_JS_VARIANTS],
      rules: {
        "n/no-missing-import": "off",
        "n/no-missing-require": "off",
      },
    })
  }

  if (allowUnpublishedModules) {
    configs.push({
      files: [GLOB_TS_VARIANTS, GLOB_JS_VARIANTS],
      rules: {
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
      },
    })
  }

  return configs
}
