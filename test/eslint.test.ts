import { describe, it, beforeAll, expect } from "vitest"
import { execa } from "execa"
import path from "node:path"
import fs from "node:fs"
import TestLogger from "./testLogger"

if (!process.env.CI) TestLogger.setLevel(1)

const eslintBin = path.resolve(__dirname, "../node_modules/.bin/eslint")
const fixturesRoot = path.resolve(__dirname, "fixtures")
const badFixturesDir = path.resolve(__dirname, "fixtures/bad")
const goodFixturesDir = path.resolve(__dirname, "fixtures/good")

const runESLintOnFile = async (
  fileName: string,
  cwd: string,
  reject: boolean = false,
) => {
  return execa(eslintBin, [fileName, "--no-error-on-unmatched-pattern"], {
    cwd,
    reject,
  })
}

const getTestFiles = (directory: string): string[] => {
  try {
    return fs
      .readdirSync(directory, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isFile() &&
          /\.(js|cjs|mjs|jsx|ts|cts|mts|tsx)$/.test(dirent.name),
      )
      .map((dirent) => dirent.name)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      TestLogger.error(`Directory "${directory}" doest not exist`)
    } else {
      TestLogger.error(`Could not to read directory ${directory}\n${error}`)
    }
    return []
  }
}

async function validateConfiguration(file: string, cwd: string) {
  const { exitCode, stdout, stderr } = await runESLintOnFile(file, cwd)
  if (exitCode !== 0) {
    TestLogger.error(`ESLint configuration check failed\n${stdout || stderr}`)
    throw new Error("Failed to validate configuration")
  }
  TestLogger.info("ESLint configuration check passed")
}

beforeAll(async () => {
  await validateConfiguration("example.ts", fixturesRoot)
  TestLogger.info("ESLint setup completed successfully")
})

interface TestSuiteConfig {
  name: "bad" | "good"
  directory: string
  shouldPass: boolean
}

const testSuites = [
  { name: "bad", directory: badFixturesDir, shouldPass: false },
  { name: "good", directory: goodFixturesDir, shouldPass: true },
] as const satisfies TestSuiteConfig[]

testSuites.forEach(({ name, directory, shouldPass }) => {
  describe(`ESLint Tests: ${name} files`, () => {
    const files = getTestFiles(directory)

    if (files.length === 0) {
      it.skip("no test files found", () => {
        return
      })
    }
    for (const file of files) {
      it.concurrent(
        `should ${shouldPass ? "pass" : "fail"} on ${file}`,
        async () => {
          const { exitCode, stdout, stderr } = await runESLintOnFile(
            file,
            directory,
          )

          if (shouldPass) {
            if (exitCode !== 0) {
              TestLogger.error(
                `Unexpected ESLint to pass for ${file}, but it failed.\n${stdout || stderr}`,
              )
            }
            expect(exitCode).toBe(0)
          } else {
            if (exitCode === 0) {
              TestLogger.error(
                `Expected ESLint to fail for ${file}, but it passed.`,
              )
            }
            expect(exitCode).not.toBe(0)
          }
        },
        20000,
      )
    }
  })
})
