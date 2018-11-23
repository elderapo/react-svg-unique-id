import * as React from 'react'

type Child = React.ReactElement<{
  children?: Child
}>

export const reactRecursiveChildrenMap = (
  children: React.ReactNode,
  fn: (child: Child) => Child
): React.ReactNode[] => {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    if (typeof child === 'number' || typeof child === 'string') {
      return child
    }

    child = child as Child

    if (child.props.children) {
      const mappedChildren = reactRecursiveChildrenMap(child.props.children, fn) as any
      child = React.cloneElement(child, {
        children: mappedChildren
      })
    }

    return fn(child)
  })
}
