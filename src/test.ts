import fs from 'fs'
import format from './index'

const jsonStr = fs.readFileSync(__dirname + '/../temp/OpenAPI_zl.json', 'utf8')
const res = format(JSON.parse(jsonStr))

console.log(res.apis.find(api => api.url === '/adapt/getFinanceList'))
