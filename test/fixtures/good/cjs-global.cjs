const path = require("node:path")

const filename = path.basename(__filename)
const dirname = path.basename(__dirname)

module.exports = {
  filename,
  dirname,
}
