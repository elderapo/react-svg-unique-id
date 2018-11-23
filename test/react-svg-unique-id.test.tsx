import { SVGUniqueID } from '../src/react-svg-unique-id'
import * as React from 'react'
import { create } from 'react-test-renderer'

const inlinedSVG = (
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
const InlinedWrappedSVG = () => (
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

describe('test', () => {
  it('should have original IDS in inlined svg', () => {
    const { root } = create(inlinedSVG)

    expect(root.findAll(node => node.props.id === 'prefix__bga').length).toBe(1)
    expect(root.findAll(node => node.props.xlinkHref === '#prefix__bga').length).toBe(1)
    expect(root.findAll(node => node.props.fill === 'url(#prefix__bga)').length).toBe(1)
  })

  it('should have original IDS in wrapped inlined svg', () => {
    const { root } = create(<InlinedWrappedSVG />)

    expect(root.findAll(node => node.props.id === 'prefix__bga').length).toBe(1)
    expect(root.findAll(node => node.props.xlinkHref === '#prefix__bga').length).toBe(1)
    expect(root.findAll(node => node.props.fill === 'url(#prefix__bga)').length).toBe(1)
  })

  it('should replace original IDS in inlined svg', () => {
    const { root } = create(<SVGUniqueID>{inlinedSVG}</SVGUniqueID>)

    expect(root.findAll(node => node.props.id === 'prefix__bga').length).toBe(0)
    expect(root.findAll(node => node.props.xlinkHref === '#prefix__bga').length).toBe(0)
    expect(root.findAll(node => node.props.fill === 'url(#prefix__bga)').length).toBe(0)
  })

  it('should replace original IDS in inlined wrapped', () => {
    const { root } = create(<SVGUniqueID>{inlinedSVG}</SVGUniqueID>)

    expect(root.findAll(node => node.props.id === 'prefix__bga').length).toBe(0)
    expect(root.findAll(node => node.props.xlinkHref === '#prefix__bga').length).toBe(0)
    expect(root.findAll(node => node.props.fill === 'url(#prefix__bga)').length).toBe(0)
  })
})
