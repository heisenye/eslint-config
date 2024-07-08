import { readFileSync } from "node:fs"
import { resolve } from "node:path"

function getModuleType() {
  const pkgPath = resolve(process.cwd(), "package.json")

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))

    return pkg.type || "commonjs"
  } catch {
    return "commonjs"
  }
}

export const type = getModuleType()
