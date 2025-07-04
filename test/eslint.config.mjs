import { createConfig } from "../dist/index.mjs"

const eslintConfig = createConfig({
  jsx: true,
  environment: "node",
  typeChecking: true,
  presetOptions: {
    allowMissingModules: true,
    allowUnpublishedModules: true,
  },
})

export default eslintConfig
