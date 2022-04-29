import formatDefinitions from './format-definitions'
import formathApi from './format-api'

/**
 * 把原始对象格式化成方便我处理的格式
 * @param origin OpenApi对象
 */
function process(origin: any) {
  // 处理实体类
  const entities = formatDefinitions(origin.definitions)
  // 处理接口
  const apis = formathApi(origin.paths)
  return {
    entities,
    apis
  }
}

export default process
