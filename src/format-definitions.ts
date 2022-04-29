import { parseType } from './utils'

/**
 * 处理实体类
 */
function formatDefinitions(definitions: any): Entity[] {
  const entityNames = Reflect.ownKeys(definitions) as string[]
  return entityNames.map(name => {
    const entity = definitions[name]
    const { type, properties, title, required = [] } = entity
    if (type === 'object') {
      return {
        name,
        properties: properties ? formatProperties(properties, required) : [],
        comment: title 
      }
    } else {
      throw new Error(`未实现的实体类型: ${type}`)
    }
  })
}

/**
 * 处理实体类的属性
 * @param required 必要属性列表
 */
function formatProperties(properties: any, required: string[]): Property[] {
  const propertyNames = Reflect.ownKeys(properties) as string[]
  return propertyNames.map(name => {
    const property = properties[name]
    const { description } = property
    return {
      name,
      type: parseType(property),
      required: required.includes(name),
      comment: description
    }
  })
}

export interface Entity {
  name: string
  properties: Property[],
  comment: string
}

export interface Property {
  name: string
  type: string
  required: boolean
  comment: string
}

export default formatDefinitions
