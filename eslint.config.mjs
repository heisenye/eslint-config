import { createConfig } from "./dist/index.mjs"

const eslintConfig = createConfig({
  jsx: true,
  environment: "node",
  presetOptions: {
    allowMissingModules: true,
    allowUnpublishedModules: true,
  },
})

export default eslintConfig
