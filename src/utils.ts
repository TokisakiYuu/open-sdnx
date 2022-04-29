import pinyin from 'tiny-pinyin'

/**
 * 从引用链接中获取实体名
 * @example
 * ```txt
 * #/definitions/公司账号信息
 * ```
 * 提取出"公司账号信息"
 */
export function getEntiryNameFromRef(ref: string) {
  return ref.replace(/^#\/definitions\//, '')
}

/**
 * 从类schema对象中解析出类型
 */
export function parseType(property: any) {
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
 * 使实体名合法化
 */
export function legalizeEntiryName(name: string) {
  return pinyinize(charReplace(name, {
    '<': '❮',
    '>': '❯',
    '+': '➕',
    '-': '➖',
    '=': '⁼',
    '*': '✕',
    '/': '⟋',
    '\\': '⟍',  // backslash
    '[': '⦗',
    ']': '⦘',
    '{': '⦃',
    '}': '⦄',
    ',': '⸴',
    ';': '⸵',
    '?': '⁇',
    '!': '‼',
    '@': '',
    '(': '⁽',
    ')': '⁾',
    '.': '',
    '`': '',
    '"': '',
    '\'': '',
    ':': '',
    '|': '',
    '#': '',
    '&': '',
    '~': ''
  }))
}

/**
 * 把文本中的汉字转成拼音且每个字首字母大写
 */
export function pinyinize(text: string): string {
  return pinyin.parse(text).map(item => {
    if (item.type !== 2) return item.source
    const { target } = item
    return target.slice(0, 1).toUpperCase() + target.slice(1).toLowerCase()
  }).join('')
}

/**
 * 批量替换文本中的字符
 */
export function charReplace(text: string, charMap: Record<string, string>): string {

}
