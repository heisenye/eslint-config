import { ESLint } from "eslint"

declare module "eslint-plugin-heisenye" {
  const heisenyePlugin: ESLint.Plugin
  export default heisenyePlugin
}
