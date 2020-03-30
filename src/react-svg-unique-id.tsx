import 'core-js/features/map'
import * as React from 'react'
import { reactRecursiveChildrenMap } from './utils'

let SVG_GLOBAL_ID = 0

/** @internal */
export const resetSVGGlobalID = () => {
  SVG_GLOBAL_ID = 0
}

export class SVGUniqueID extends React.Component {
  private svgId: number = SVG_GLOBAL_ID++

  private lastLocalId: number = 0
  private localIdsMap = new Map<string, number>()

  private getHookedId(originalId: string): string | null {
    if (typeof originalId === 'undefined') {
      return null
    }

    if (!this.localIdsMap.has(originalId)) {
      this.localIdsMap.set(originalId, this.lastLocalId++)
    }

    const localId = this.localIdsMap.get(originalId)

    return `___SVG_ID__${this.svgId}__${localId}___`
  }

  private fixPropWithUrl(prop: string): string {
    if (typeof prop !== 'string') {
      return prop
    }

    const [_, id] = prop.match(/^url\(#(.*)\)$/) || [null, null]

    if (id === null) {
      return prop
    }

    const fixedId = this.getHookedId(id)

    if (fixedId === null) {
      return prop
    }

    return `url(#${fixedId})`
  }

  private getHookedXlinkHref(prop: string): string {
    if (typeof prop !== 'string' || !prop.startsWith('#')) {
      return prop
    }

    const id = prop.replace('#', '')

    const fixedId = this.getHookedId(id)
    if (fixedId === null) {
      return prop
    }

    return `#${fixedId}`
  }

  render() {
    return reactRecursiveChildrenMap(this.props.children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child
      }

      const fixedId = this.getHookedId(child.props.id)

      const fixedProps = {
        ...child.props
      }

      Object.keys(fixedProps).map(key => (fixedProps[key] = this.fixPropWithUrl(fixedProps[key])))

      return React.cloneElement(child, {
        ...fixedProps,
        id: fixedId,
        xlinkHref: this.getHookedXlinkHref(child.props.xlinkHref)
      })
    })
  }
}

export default SVGUniqueID
