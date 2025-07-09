import { describe, it, expect } from "vitest"
import { mergeRules, conditionalConfigs } from "@/utils"
import type { Linter } from "eslint"

describe("mergeRules", () => {
  it("merges multiple rule objects", () => {
    const rules1: Partial<Linter.RulesRecord> = {
      eqeqeq: ["error", "always"],
    }
    const rules2: Partial<Linter.RulesRecord> = {
      "no-unused-vars": ["warn"],
    }
    const result = mergeRules(rules1, rules2)
    expect(result).toEqual({
      eqeqeq: ["error", "always"],
      "no-unused-vars": ["warn"],
    })
  })

  it("later rules override earlier ones", () => {
    const result = mergeRules(
      { eqeqeq: ["warn"] },
      { eqeqeq: ["error", "always"] },
    )
    expect(result).toEqual({ eqeqeq: ["error", "always"] })
  })

  it("filters out undefined values", () => {
    const result = mergeRules(undefined, { "no-console": "off" }, undefined)
    expect(result).toEqual({ "no-console": "off" })
  })
})

describe("conditionalConfigs", () => {
  const jsBaseConfig: Linter.Config = { name: "javascript/base", rules: {} }

  it("returns config as array when condition is true", () => {
    const result = conditionalConfigs(true, jsBaseConfig)
    expect(result).toEqual([jsBaseConfig])
  })

  it("returns empty array when condition is false", () => {
    const result = conditionalConfigs(false, jsBaseConfig)
    expect(result).toEqual([])
  })

  it("returns empty array when condition is undefined", () => {
    const result = conditionalConfigs(undefined, jsBaseConfig)
    expect(result).toEqual([])
  })

  it("returns config array as-is when input is already array", () => {
    const configs: Linter.Config[] = [
      { name: "javascript/recommended" },
      { name: "javascript/prettier" },
    ]
    const result = conditionalConfigs(true, configs)
    expect(result).toEqual(configs)
  })
})
