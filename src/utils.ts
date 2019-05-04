import { deepMap as deepMapType } from 'react-children-utilities'
// @ts-ignore
import ReactChildrenUtilities from 'react-children-utilities'

export const reactRecursiveChildrenMap = ReactChildrenUtilities.deepMap.bind(
  ReactChildrenUtilities
) as typeof deepMapType
