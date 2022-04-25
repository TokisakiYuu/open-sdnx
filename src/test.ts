import fs from 'fs'
import format from './index'

const jsonStr = fs.readFileSync(__dirname + '/../temp/OpenAPI.json', 'utf8')
const res = format(JSON.parse(jsonStr))

res.entities.forEach(entiry => {
  if (entiry.name === '返回参数«Map«string,bigdecimal»»') {
    console.log(entiry)
  }
})
