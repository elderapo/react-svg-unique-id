// @ts-ignore
import ReactChildrenUtilities, { deepMap as deepMapType } from 'react-children-utilities'

export const reactRecursiveChildrenMap = ReactChildrenUtilities.deepMap.bind(
  ReactChildrenUtilities
) as typeof deepMapType
