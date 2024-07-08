import { config } from "./dist/index.mjs"

const eslintConfig = config({
  userConfig: {
    files: ["**/*.?(c|m)js", "**/*.ts"],
    rules: {
      "n/no-missing-import": "off",
      "n/no-missing-require": "off",
    },
  },
})

export default eslintConfig
