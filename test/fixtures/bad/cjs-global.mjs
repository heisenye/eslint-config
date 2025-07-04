import path from "node:path"

const filename = path.basename(__filename)
const dirname = path.basename(__dirname)

export { filename, dirname }
