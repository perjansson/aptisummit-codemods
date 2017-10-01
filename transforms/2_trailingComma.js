const transformer = (file, api) => {
  const j = api.jscodeshift

  const multiLineArrayWithoutTrailingComma = ({ node }) => {
    if (
      node.elements.length === 0 ||
      node.loc.start.line === node.loc.end.line
    ) {
      return false
    }
    const last = node.elements[node.elements.length - 1]
    return file.source.charAt(last.end) !== ','
  }

  const addTrailingComma = ({ node }) => {
    node.original = null
  }

  const root = j(file.source)
  root
    .find(j.ArrayExpression)
    .filter(multiLineArrayWithoutTrailingComma)
    .forEach(addTrailingComma)
    .toSource()

  return root.toSource({
    trailingComma: true,
    wrapColumn: 1
  })
}

export default transformer
