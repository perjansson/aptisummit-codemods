const transformer = (file, api) => {
  const j = api.jscodeshift

  const allFunctionsCallingBind = {
    callee: {
      property: { name: 'bind' },
      object: { type: 'FunctionExpression' }
    }
  }

  const onlyCalledWithThisArg = path =>
    path.value.arguments.length == 1 &&
    path.value.arguments[0].type == 'ThisExpression'

  const arrowFunction = path => {
    const oldBody = path.value.callee.object.body
    const isOnlyReturnStatement =
      oldBody.type == 'BlockStatement' &&
      oldBody.body.length == 1 &&
      oldBody.body[0].type == 'ReturnStatement'
    const newBody = isOnlyReturnStatement ? oldBody.body[0].argument : oldBody

    return j.arrowFunctionExpression(
      path.value.callee.object.params,
      newBody,
      isOnlyReturnStatement
    )
  }

  return j(file.source)
    .find(j.CallExpression, allFunctionsCallingBind)
    .filter(onlyCalledWithThisArg)
    .replaceWith(arrowFunction)
    .toSource()
}

export default transformer
