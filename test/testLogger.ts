import chalk, { Chalk } from "chalk"
import type { ChalkInstance } from "chalk"

class TestLogger {
  static chalk: ChalkInstance = chalk

  static setLevel(level: ChalkInstance["level"]) {
    this.chalk = new Chalk({ level })
  }

  static info(message: string) {
    console.log(this.chalk.blue(`INFO: ${message}`))
  }

  static error(message: string) {
    console.error(this.chalk.red(`ERROR: ${message}`))
  }
}

export default TestLogger
