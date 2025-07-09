import type { Linter } from "eslint"

export function mergeRules(
  ...rules: (Partial<Linter.RulesRecord> | undefined)[]
): Linter.RulesRecord {
  return Object.assign({}, ...rules.filter(Boolean)) as Linter.RulesRecord
}

export function conditionalConfigs(
  condition: boolean | undefined,
  configs: Linter.Config | Linter.Config[],
): Linter.Config[] {
  if (!condition) return []
  return Array.isArray(configs) ? configs : [configs]
}
