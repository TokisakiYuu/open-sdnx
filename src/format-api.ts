import { getEntiryNameFromRef, parseType } from './utils'

function formatPaths(paths: any): Endpoint[] {
  return Reflect.ownKeys(paths).flatMap(path => {
    const pathItem = paths[path]
    return Reflect.ownKeys(pathItem).flatMap(method => {
      const { summary, responses, parameters } = pathItem[method]
      return [{
        url: path as string,
        method: method as string,
        comment: summary,
        parameters: formatParameters(parameters),
        responseType: responses[200] ? parseSchemaType(responses[200]) : 'null'
      }]
    })
  })
}

function formatParameters(parameters: any): Parameter[] {
  if (!Array.isArray(parameters)) return []
  return parameters.map(parameter => {
    const { name, in: position = 'body', description, required, schema, type } = parameter
    const typeName = type || parseType(schema)
    return {
      position,
      name,
      type: typeName,
      required,
      comment: description
    }
  })
}

function parseSchemaType(response: any) {
  const { schema } = response
  if (!schema) return 'null'
  if (schema.type) {
    return schema.type
  }
  if (schema.$ref) {
    return getEntiryNameFromRef(schema.$ref)
  }
  return 'any'
}

export interface Endpoint {
  url: string
  method: string
  comment: string
  parameters: Parameter[]
  responseType: string
}

export interface Parameter {
  position: 'body' | 'path' | 'query' | never
  name: string
  type: string
  required: boolean
  comment: string
}

export default formatPaths
