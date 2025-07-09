import type { Linter } from "eslint"

type environment = "browser" | "node"

interface LanguageOptions {
  ecmaVersion?: Linter.ParserOptions["ecmaVersion"]
  jsx?: boolean
}

export interface PresetOptions {
  allowMissingModules?: boolean
  allowUnpublishedModules?: boolean
  allowExtraneousModules?: boolean
}

export interface ConfigOptions
  extends LanguageOptions,
    JavaScriptOptions,
    TypeScriptOptions {
  environment?: environment
  globalIgnores?: string[]
  javascriptRules?: JavaScriptOptions["javascriptRules"]
  typescriptRules?: TypeScriptOptions["typescriptRules"]
  typeChecking?: boolean
  tsconfigRootDir?: string
  presetOptions?: PresetOptions
  userConfigs?: Linter.Config[]
}

export interface JavaScriptOptions extends LanguageOptions {
  javascriptRules?: Linter.RulesRecord
}

export interface TypeScriptOptions extends LanguageOptions {
  typescriptRules?: Linter.RulesRecord
  typeChecking?: boolean
  tsconfigRootDir?: string
}
