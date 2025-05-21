import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  externals: [
    "eslint",
    "@eslint/js",
    "eslint-plugin-n",
    "@typescript-eslint/parser",
    "@typescript-eslint/utils",
  ],
  clean: true,
  entries: ["src/index"],
  rollup: {
    emitCJS: true,
    esbuild: {
      target: "esnext",
    },
  },
  declaration: "compatible",
})
