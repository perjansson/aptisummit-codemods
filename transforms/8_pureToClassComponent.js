const transformer = (file, api) => {
  const j = api.jscodeshift
  const { statement } = j.template

  function hasJSXElement(ast) {
    return (
      j(ast)
        .find(j.JSXElement)
        .size() > 0
    )
  }

  return j(file.source)
    .find(j.VariableDeclaration)
    .filter(p => p.value.declarations.length == 1)
    .replaceWith(p => {
      const decl = p.value.declarations[0]
      if (
        decl.init.type !== 'ArrowFunctionExpression' ||
        (!hasJSXElement(decl.init.body) && decl.init.body.type !== 'JSXElement')
      )
        return p.value

      let body = decl.init.body
      body =
        body.type == 'JSXElement' ? j.returnStatement(body) : (body = body.body)

      j(body)
        .find(j.Identifier, { name: 'props' })
        .replaceWith(p =>
          j.memberExpression(j.thisExpression(), j.identifier('props'))
        )

      return statement`class ${decl.id} extends Component {
  render() { ${body} }
}`
    })
    .toSource()
}

export default transformer
