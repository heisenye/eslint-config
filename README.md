<h2 style="text-align: center">@heisenye/eslint-config</h2>
<div style="text-align: center">
  <a href="https://www.npmjs.com/package/@heisenye/eslint-config">
    <img src="https://img.shields.io/npm/v/@heisenye/eslint-config?style=for-the-badge" alt="npm version">
  </a>
</div>

### Description

- Using flat-type eslint configuration for simplicity and ease of use
- Providing built-in support for typescript files
- Integrating the eslint-plugin-prettier plugin for seamless Prettier compatibility and friendly support
- Incorporating the eslint-plugin-n plugin, making it highly suitable for Node.js projects
- By defalut, files in the dist directory at the project root are ignored during linting

### Usage

```bash
pnpm add @heisenye/eslint-config -D
````

First, create eslint.config.mjs in your project root,

```js
// eslint.config.mjs
import { config } from "@heisenye/eslint-config"

export default config()
```

You can also pass custom config to the function

```js
// eslint.config.mjs
import { config } from "@heisenye/eslint-config"

export default config(
  {
    userConfig:
    // your custom config
    // example
      {
        files: ["src/bin/cli.ts"],
        rules: {
          "n/hashbang": "off",
        },
      },
  },
)
```

If you use Prettier, you can create a Prettier config file (e.g., .prettierrc) in your project root,
configuration in the this file will automatically be applied to eslint

```json
{
  "semi": false
}
```

```js
const a = 1; // ESLint: Delete `;` (prettier/prettier)
```

Detailed options here

```js
import { config } from "@heisenye/eslint-config"

export default config(
  {
    userConfig: {
      // your custom config
    },
    globalIngores: [
      // global ignore files
      // example
      "**/*.txt",
    ],
    allowMissingModules: true, // default is true
    // "n/no-unpublished-import" and "n/no-unpublished-require" rules will be disabled
    allowUnpublishedModules: true, // default is true
    // "n/no-missing-import" and "n/no-missing-require" rules will be disabled
  }
)
```
