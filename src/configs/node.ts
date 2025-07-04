import { Linter } from "eslint"
import nodePlugin from "eslint-plugin-n"
import {
  GLOB_JS,
  GLOB_MJS,
  GLOB_JSX,
  GLOB_TS,
  GLOB_MTS,
  GLOB_TSX,
  GLOB_CONFIG,
  GLOB_JS_TS,
  GLOB_CJS,
  GLOB_CTS,
  conditionalConfigs,
} from "../utils"
import globals from "globals"

export function node({ browser = false }): Linter.Config[] {
  return [
    ...conditionalConfigs(browser, [
      {
        ...nodePlugin.configs["flat/recommended-module"],
        name: "node/browser-recommended",
        files: [GLOB_JS, GLOB_MJS, GLOB_JSX, GLOB_TS, GLOB_MTS, GLOB_TSX],
        languageOptions: {
          sourceType: "module",
          globals: {
            ...(nodePlugin.configs["flat/recommended-module"].languageOptions
              ?.globals ?? {}),
            ...globals.browser,
            ...Object.fromEntries(
              Object.keys(globals.commonjs).map((global) => [global, "off"]),
            ),
            ...Object.fromEntries(
              Object.keys(globals.node).map((global) => [global, "off"]),
            ),
          },
        },
        rules: {
          ...nodePlugin.configs["flat/recommended-module"]?.rules,
        },
      },
      {
        name: "node/browser-config-recommended",
        files: [GLOB_CONFIG],
        languageOptions: {
          sourceType: "module",
          globals: {
            ...globals.node,
            NodeJS: false,
          },
        },
      },
    ]),
    ...conditionalConfigs(!browser, [
      {
        ...nodePlugin.configs["flat/recommended"],
        name: "node/recommended",
        files: [...GLOB_JS_TS],
      },
      {
        ...nodePlugin.configs["flat/recommended-module"],
        name: "node/recommended-module",
        files: [GLOB_MJS, GLOB_MTS],
      },
      {
        ...nodePlugin.configs["flat/recommended-script"],
        name: "node/recommended-commonjs",
        files: [GLOB_CJS, GLOB_CTS],
      },
    ]),
  ]
}
