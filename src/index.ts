import formatDefinitions from './formatDefinitions'

/**
 * 把原始对象格式化成方便我处理的格式
 * @param origin OpenApi对象
 */
function process(origin: any) {
  // 处理实体类
  const entities = formatDefinitions(origin.definitions)
  return {
    entities
  }
}

export default process
