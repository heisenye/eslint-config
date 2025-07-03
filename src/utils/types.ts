import type { Linter } from "eslint"

type environment = "browser" | "node"

interface LanguageOptions {
  ecmaVersion?: Linter.ParserOptions["ecmaVersion"]
  jsx?: boolean
}

export interface PresetOptions {
  allowMissingModules?: boolean
  allowUnpublishedModules?: boolean
}

export interface ConfigOptions extends LanguageOptions {
  environment?: environment
  globalIgnores?: string[]
  javascriptRules?: JavaScriptOptions["rules"]
  typescriptRules?: TypeScriptOptions["rules"]
  typeChecking?: boolean
  presetOptions?: PresetOptions
  userConfigs?: Linter.Config[]
}

export interface JavaScriptOptions extends LanguageOptions {
  rules?: Linter.RulesRecord
}

export interface TypeScriptOptions extends JavaScriptOptions {
  typeChecking?: boolean
}
