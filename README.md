# react-svg-unique-id

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/elderapo/react-svg-unique-id.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/elderapo/react-svg-unique-id.svg?branch=master)](https://travis-ci.org/elderapo/react-svg-unique-id)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/semjnuvpwjrtgj99?svg=true)](https://ci.appveyor.com/project/elderapo/react-svg-unique-id)
[![Coveralls](https://img.shields.io/coveralls/elderapo/react-svg-unique-id.svg)](https://coveralls.io/github/elderapo/react-svg-unique-id)
[![Dev Dependencies](https://david-dm.org/elderapo/react-svg-unique-id/dev-status.svg)](https://david-dm.org/elderapo/react-svg-unique-id?type=dev)

SVG processors like [SVGO](https://github.com/svg/svgo) optimize SVG ids which often results in duplicated ids across multiple SVGs. This library tries to fix that by replacing all children ids and id references (`#id`, `url(#id)`) in SVG tags with unique generated ids like `___SVG_ID__10__0___`.

### How to install

```bash
yarn add react-svg-unique-id
# or
npm install react-svg-unique-id
```

### Usage

```typescript
import * as React from 'react'
import { SVGUniqueID } from 'react-svg-unique-id'

export const SVG1 = () => (
  <SVGUniqueID>
    <svg width="100%" height="100%" viewBox="0 0 60 64">
      <defs>
        <linearGradient id="prefix__bga" /> // prefix__bga => ___SVG_ID__0__0___
      </defs>
      <g fillRule="nonzero" fill="none">
        <use xlinkHref="#prefix__bga" /> // #prefix__bga => #___SVG_ID__0__0___
        <path fill="url(#prefix__bga)" /> // url(#prefix__bga) => "url(#___SVG_ID__0__0___)
      </g>
    </svg>
  </SVGUniqueID>
)

export const SVG2 = () => (
  <SVGUniqueID>
    <svg width="100%" height="100%" viewBox="0 0 60 64">
      <defs>
        <linearGradient id="prefix__bga" /> // prefix__bga => ___SVG_ID__1__0___
      </defs>
      <g fillRule="nonzero" fill="none">
        <use xlinkHref="#prefix__bga" /> // #prefix__bga => #___SVG_ID__1__0___
        <path fill="url(#prefix__bga)" /> // url(#prefix__bga) => url(#___SVG_ID__1__0___)
      </g>
    </svg>
  </SVGUniqueID>
)
```

If both of these SVGs were not wrapped in `SVGUniqueID` component there would be an id collision since two html elements would have `prefix__bga` as thier id.
