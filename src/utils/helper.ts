import type { Linter } from "eslint"

export function mergeRules(
  ...rules: (Linter.RulesRecord | undefined)[]
): Linter.RulesRecord {
  return Object.assign({}, ...rules)
}

export function conditionalConfigs(
  condition: boolean | undefined,
  config: Linter.Config | Linter.Config[],
): Linter.Config[] {
  if (!condition) return []
  return Array.isArray(config) ? config : [config]
}
