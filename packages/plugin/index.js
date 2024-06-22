import mew from "./lib/rules/mew.js"
import pkg from "./package.json" with { type: "json" }

/**
 * @type {import("eslint").ESLint.Plugin}
 */
const heisenyePlugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    mew,
  },
}

export default heisenyePlugin
