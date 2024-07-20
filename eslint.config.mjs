import { config } from "./dist/index.mjs"

const eslintConfig = config({
  useBundle: true,
})

export default eslintConfig
