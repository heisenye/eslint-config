export const GLOB_JS = "**/*.js"
export const GLOB_JSX = "**/*.jsx"
export const GLOB_CJS = "**/*.cjs"
export const GLOB_MJS = "**/*.mjs"
export const GLOB_TS = "**/*.ts"
export const GLOB_TSX = "**/*.tsx"
export const GLOB_CTS = "**/*.cts"
export const GLOB_MTS = "**/*.mts"

export const GLOB_JS_VARIANTS = [GLOB_JS, GLOB_MJS, GLOB_CJS, GLOB_JSX] as const
export const GLOB_TS_VARIANTS = [GLOB_TS, GLOB_TSX, GLOB_MTS, GLOB_CTS] as const
export const GLOB_JS_TS = [...GLOB_JS_VARIANTS, ...GLOB_TS_VARIANTS] as const

const GLOB_DIST = ["**/dist/**", "**/build/**", "**/out/**"] as const
const GLOB_NODE_MODULES = ["**/node_modules/**"] as const
const GLOB_GIT = ["**/.git/**"] as const
const GLOB_COVERAGE = ["**/coverage/**"] as const
const GLOB_NEXT = ["**/.next/**"] as const
const GLOB_NUXT = ["**/.nuxt/**"] as const
const GLOB_CACHE = ["**/.cache/**"] as const
const GLOB_TEMP = ["**/temp/**", "**/tmp/**"] as const

export const DEFAULT_IGNORES = [
  ...GLOB_DIST,
  ...GLOB_NODE_MODULES,
  ...GLOB_GIT,
  ...GLOB_COVERAGE,
  ...GLOB_NEXT,
  ...GLOB_NUXT,
  ...GLOB_CACHE,
  ...GLOB_TEMP,
] as const

export const GLOB_CONFIG = ["**/.config/**"]
