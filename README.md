<h1 align="center">@heisenye/eslint-config</h1>
<div align="center">
  <h3>🎯 A Modern ESLint Configuration for JavaScript & TypeScript Projects</h3>
  <p>Zero-config ESLint setup with sensible defaults, TypeScript support, and Prettier integration</p>

  <a href="https://www.npmjs.com/package/@heisenye/eslint-config">
    <img src="https://img.shields.io/npm/v/@heisenye/eslint-config?style=flat-square&color=brightgreen" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@heisenye/eslint-config">
    <img src="https://img.shields.io/npm/dm/@heisenye/eslint-config?style=flat-square&color=blue" alt="npm downloads">
  </a>
  <a href="https://github.com/heisenye/eslint-config/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@heisenye/eslint-config?style=flat-square&color=yellow" alt="license">
  </a>
</div>

## ✨ Features

- 🚀 **ESLint Flat Config** - Uses the latest ESLint flat configuration system for better performance and simplicity
- 📘 **First-class TypeScript Support** - Built-in TypeScript linting with optional type-aware rules
- 💅 **Prettier Integration** - Seamless code formatting through `eslint-plugin-prettier`
- 🟢 **Node.js Best Practices** - Includes `eslint-plugin-n` for Node.js specific linting
- 🎯 **Smart Defaults** - Automatically ignores common directories (`dist/`, `node_modules/`, etc.)
- ⚙️ **Fully Customizable** - Override any rule while keeping the base configuration
- 🌐 **Environment Aware** - Optimized configs for Node.js and browser environments

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add -D @heisenye/eslint-config

# Using npm
npm install -D @heisenye/eslint-config

# Using yarn
yarn add -D @heisenye/eslint-config
```

## 🚀 Quick Start

### Basic Setup

Create `eslint.config.mjs` in your project root:

```js
import { createConfig } from "@heisenye/eslint-config"

export default createConfig()
```

### With Prettier

This config automatically integrates with Prettier. Create a `.prettierrc` file to customize formatting:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2
}
```

ESLint will now show Prettier formatting issues:

```js
const a = 1; // ESLint: Delete `;` [prettier/prettier]
```

## 📖 Configuration Options

### Basic Options

```js
import { createConfig } from "@heisenye/eslint-config"

export default createConfig({
  // ECMAScript version (default: "latest")
  ecmaVersion: "latest",
  
  // Enable JSX support (default: false)
  jsx: true,
  
  // Target environment: "node" | "browser" (default: "node")
  environment: "browser",
  
  // Enable TypeScript type-checking rules (default: false)
  typeChecking: true,
  
  // Path to TypeScript config 
  tsconfigRootDir: ".",
})
```

### Custom Rules

Override or add rules for JavaScript and TypeScript:

```js
export default createConfig({
  // JavaScript-specific rules
  javascriptRules: {
    "no-console": "warn",
    "prefer-const": "error",
  },
  
  // TypeScript-specific rules
  typescriptRules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
})
```

### Advanced Configuration

```js
export default createConfig({
  // Additional patterns to ignore
  globalIgnores: [
    "**/*.generated.ts",
    "**/vendor/**",
  ],
  
  // Preset options
  presetOptions: {
    // Allow importing modules that might not exist (default: false)
    // "n/no-missing-import": "off", "n/no-missing-require": "off"
    allowMissingModules: true,
    
    // Allow importing unpublished packages (default: false)
    // "n/no-unpublished-import": "off", "n/no-unpublished-require": "off"
    allowUnpublishedModules: true,
    
    // Allow importing extraneous modules (default: false)
    // "n/no-extraneous-import": "off", "n/no-extraneous-require": "off"
    allowExtraneousModules: true,
  },
  
  // Add custom ESLint configurations
  userConfigs: [
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
      },
    },
    {
      files: ["src/bin/*.ts"],
      rules: {
        "n/hashbang": "off",
      },
    },
  ],
})
```

## 🎯 Common Use Cases

### Node.js CLI Tool

```js
export default createConfig({
  userConfigs: [
    {
      files: ["src/cli.ts"],
      rules: {
        "n/hashbang": "off",
        "no-console": "off",
      },
    },
  ],
})
```

### Monorepo Setup

```js
export default createConfig({
  typeChecking: true,
  globalIgnores: [
    "**/packages/*/dist/**",
    "**/packages/*/build/**",
  ],
  presetOptions: {
    allowUnpublishedModules: true, // For internal packages
  },
})
```

## 📝 Default Ignored Patterns

The following patterns are ignored by default:

- `**/dist/**` - Distribution/build outputs
- `**/build/**` - Build outputs
- `**/out/**` - Output directories
- `**/node_modules/**` - Dependencies
- `**/.git/**` - Git directory
- `**/coverage/**` - Test coverage reports
- `**/.next/**` - Next.js build output
- `**/.nuxt/**` - Nuxt.js build output
- `**/.cache/**` - Cache directories
- `**/temp/**`, `**/tmp/**` - Temporary files

## 🤔 FAQ

### Can I use this with existing ESLint plugins?

Yes! Add them to your `userConfigs`:

```js
import somePlugin from "eslint-plugin-something"

export default createConfig({
  userConfigs: [
    {
      plugins: {
        something: somePlugin,
      },
      rules: {
        "something/rule-name": "error",
      },
    },
  ],
})
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [heisenye](https://github.com/heisenye)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/heisenye">heisenye</a></sub>
</div>
