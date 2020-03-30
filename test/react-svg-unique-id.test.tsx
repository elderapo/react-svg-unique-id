import { SVGUniqueID, resetSVGGlobalID } from '../src/react-svg-unique-id'
import * as React from 'react'
import { create } from 'react-test-renderer'
import * as util from 'util'

describe('test', () => {
  beforeEach(() => {
    resetSVGGlobalID()
  })

  it('should correctly replace props', () => {
    const original = (
      <svg width="100%" height="100%" viewBox="0 0 60 64">
        <defs>
          <linearGradient id="prefix__bga" />
        </defs>
        <g fillRule="nonzero" fill="none">
          <use xlinkHref="#prefix__bga" />
          <path fill="url(#prefix__bga)" />
        </g>
      </svg>
    )

    const { root: originalRoot } = create(original)

    expect(originalRoot.findByType('linearGradient').props.id).toBe('prefix__bga')
    expect(originalRoot.findByType('use').props.xlinkHref).toBe('#prefix__bga')
    expect(originalRoot.findByType('path').props.fill).toBe('url(#prefix__bga)')

    const wrapped = <SVGUniqueID>{original}</SVGUniqueID>

    const { root: wrappedRoot } = create(wrapped)

    expect(wrappedRoot.findByType('linearGradient').props.id).toBe('___SVG_ID__0__0___')
    expect(wrappedRoot.findByType('use').props.xlinkHref).toBe('#___SVG_ID__0__0___')
    expect(wrappedRoot.findByType('path').props.fill).toBe('url(#___SVG_ID__0__0___)')
  })

  it('should work with url like props', () => {
    const original = (
      <svg width="100%" height="100%" viewBox="0 0 60 64">
        <defs>
          <linearGradient id="l" />
        </defs>
        <g fillRule="nonzero" fill="none">
          <use xlinkHref="#l" />
          <path fill="url(#l)" />
        </g>
      </svg>
    )

    const { root: originalRoot } = create(original)

    expect(originalRoot.findByType('linearGradient').props.id).toBe('l')
    expect(originalRoot.findByType('use').props.xlinkHref).toBe('#l')
    expect(originalRoot.findByType('path').props.fill).toBe('url(#l)')

    const wrapped = <SVGUniqueID>{original}</SVGUniqueID>

    const { root: wrappedRoot } = create(wrapped)

    expect(wrappedRoot.findByType('linearGradient').props.id).toBe('___SVG_ID__0__0___')
    expect(wrappedRoot.findByType('use').props.xlinkHref).toBe('#___SVG_ID__0__0___')
    expect(wrappedRoot.findByType('path').props.fill).toBe('url(#___SVG_ID__0__0___)')
  })
})
