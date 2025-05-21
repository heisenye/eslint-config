import { config } from "./dist/index.mjs"

const eslintConfig = config({
  allowMissingModules: true,
  allowUnpublishedModules: true,
})

export default eslintConfig
