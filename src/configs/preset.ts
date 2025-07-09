import type { Linter } from "eslint"
import {
  GLOB_JS_VARIANTS,
  GLOB_TS_VARIANTS,
  conditionalConfigs,
} from "../utils"
import type { PresetOptions } from "../utils"

export function preset(presetOptions: PresetOptions): Linter.Config[] {
  const {
    allowMissingModules = false,
    allowUnpublishedModules = false,
    allowExtraneousModules = false,
  } = presetOptions

  return [
    ...conditionalConfigs(allowMissingModules, {
      name: "preset/allow-missing-modules",
      files: [...GLOB_JS_VARIANTS, ...GLOB_TS_VARIANTS],
      rules: {
        "n/no-missing-import": "off",
        "n/no-missing-require": "off",
      },
    }),
    ...conditionalConfigs(allowUnpublishedModules, {
      name: "preset/allow-unpublished-modules",
      files: [...GLOB_JS_VARIANTS, ...GLOB_TS_VARIANTS],
      rules: {
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
      },
    }),
    ...conditionalConfigs(allowExtraneousModules, {
      name: "preset/allow-extraneous-modules",
      files: [...GLOB_JS_VARIANTS, ...GLOB_TS_VARIANTS],
      rules: {
        "n/no-extraneous-import": "off",
        "n/no-extraneous-require": "off",
      },
    }),
  ]
}
