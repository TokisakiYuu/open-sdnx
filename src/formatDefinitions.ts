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

/**
 * 从属性对象中解析出类型
 */
function parseType(property: any) {
  const { type, items, $ref } = property
  if ($ref) {
    return getEntiryNameFromRef($ref)
  }
  if (items) {
    return parseType(items)
  }
  // TODO 对于additionalProperties字段的行为尚不完全明确，待有实际完整清晰的案例之后再完善这部分
  return transformTypeName(type)
}

function transformTypeName(type: string) {
  switch (type) {
    case 'integer':
      return 'number'
    case 'object':
      return 'any'
    default:
      return type
  }
}

/**
 * 从引用链接中获取实体名
 * @example
 * ```txt
 * #/definitions/公司账号信息
 * ```
 * 提取出"公司账号信息"
 */
function getEntiryNameFromRef(ref: string) {
  return ref.replace(/^#\/definitions\//, '')
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
