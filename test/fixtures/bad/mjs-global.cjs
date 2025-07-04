const path = require("node:path")

const filename = path.basename(import.meta.url)

export { filename }
