import fs from 'fs'
import path from 'path'

export default fs.readdirSync(path.join(__dirname, '../..', 'public/images/gallery'))