import { createConfig } from "./dist/index.mjs"

const eslintConfig = createConfig({
  environment: "node",
  presetOptions: {
    allowMissingModules: true,
    allowUnpublishedModules: true,
    allowExtraneousModules: true,
  },
  typeChecking: true,
  tsconfigRootDir: "tsconfig.json",
})

export default eslintConfig
