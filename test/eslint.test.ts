import { ESLint, Linter } from "eslint"
import { describe, it, expect, beforeAll } from "vitest"
import { createConfig } from "@/index"
import { javascript, typescript } from "@/configs"

enum Severity {
  off,
  warn,
  error,
}

function verifyRule(
  config: Linter.Config,
  ruleName: string,
  severity: Linter.RuleSeverity,
) {
  const rule = config.rules?.[ruleName]
  expect(rule, `Missing rule ${ruleName}`).toBeDefined()

  if (Array.isArray(rule)) {
    expect(rule[0]).toBe(severity)
  } else {
    expect(rule).toBe(severity)
  }
}

function getRuleSeverity(entry: Linter.RuleEntry) {
  if (Array.isArray(entry)) return entry[0]
  return entry
}

describe("Base JsConfig", () => {
  let jsBaseConfig: Linter.Config

  beforeAll(async () => {
    const eslint = new ESLint({ baseConfig: createConfig() })
    jsBaseConfig = (await eslint.calculateConfigForFile(
      "test.js",
    )) as Linter.Config
  })

  it("should match rule snapshot", () => {
    expect(jsBaseConfig).toMatchSnapshot()
  })

  for (const [ruleName, ruleEntry] of Object.entries(javascript().rules)) {
    const ruleSeverity = getRuleSeverity(ruleEntry)
    const expectedSeverity = (
      typeof ruleSeverity === "string" ? Severity[ruleSeverity] : ruleSeverity
    ) as Linter.RuleSeverity

    it(`should have rule ${ruleName} as ${ruleSeverity}`, () => {
      verifyRule(jsBaseConfig, ruleName, expectedSeverity)
    })
  }
})

describe("Base TsConfig", () => {
  let tsBaseConfig: Linter.Config
  let tsTypeCheckedConfig: Linter.Config

  beforeAll(async () => {
    tsBaseConfig = (await new ESLint({
      baseConfig: createConfig(),
    }).calculateConfigForFile("test.ts")) as Linter.Config
    tsTypeCheckedConfig = (await new ESLint({
      baseConfig: createConfig({ typeChecking: true, tsconfigRootDir: "." }),
    }).calculateConfigForFile("test.ts")) as Linter.Config
  })

  it("should match rule snapshot", () => {
    expect(tsBaseConfig).toMatchSnapshot()
    expect(tsTypeCheckedConfig).toMatchSnapshot()
  })

  const tsBaseRules = typescript()[0].rules
  const typecheckedRules = typescript({ typeChecking: true })[1].rules

  for (const [ruleName, ruleEntry] of Object.entries(tsBaseRules)) {
    const ruleSeverity = getRuleSeverity(ruleEntry)
    const expectedSeverity = (
      typeof ruleSeverity === "string" ? Severity[ruleSeverity] : ruleSeverity
    ) as Linter.RuleSeverity

    it(`should have rule ${ruleName} as ${ruleSeverity}`, () => {
      verifyRule(tsBaseConfig, ruleName, expectedSeverity)
    })
  }

  for (const [ruleName, ruleEntry] of Object.entries(typecheckedRules)) {
    const ruleSeverity = getRuleSeverity(ruleEntry)
    const expectedSeverity = (
      typeof ruleSeverity === "string" ? Severity[ruleSeverity] : ruleSeverity
    ) as Linter.RuleSeverity

    it(`should have rule ${ruleName} as ${ruleSeverity}`, () => {
      verifyRule(tsTypeCheckedConfig, ruleName, expectedSeverity)
    })
  }
})
