[js-merging](http://aureooms.github.io/js-merging)
==

Merging code bricks for JavaScript. Parent is
[aureooms/js-sort](https://github.com/aureooms/js-sort).

```js
merging.iterables( compare.increasing , count( 0 , 2 ) , count( 1 , 3 ) ) ;
// 0 1 2 4 4 6 7 8 10 10 ...
```

[![License](https://img.shields.io/github/license/aureooms/js-merging.svg)](https://raw.githubusercontent.com/aureooms/js-merging/master/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-merging.svg)](https://www.npmjs.org/package/@aureooms/js-merging)
[![Build](https://img.shields.io/travis/aureooms/js-merging/master.svg)](https://travis-ci.org/aureooms/js-merging/branches)
[![Dependencies](https://img.shields.io/david/aureooms/js-merging.svg)](https://david-dm.org/aureooms/js-merging)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-merging.svg)](https://david-dm.org/aureooms/js-merging?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-merging.svg)](https://github.com/aureooms/js-merging/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-merging.svg)](https://www.npmjs.org/package/@aureooms/js-merging)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-merging.svg)](https://codeclimate.com/github/aureooms/js-merging/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/js-merging.svg)](https://codeclimate.com/github/aureooms/js-merging/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/js-merging/master.svg)](https://codecov.io/gh/aureooms/js-merging)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-merging.svg)](https://codeclimate.com/github/aureooms/js-merging/trends/technical_debt)
[![Documentation](http://aureooms.github.io/js-merging//badge.svg)](http://aureooms.github.io/js-merging//source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-merging)](https://bundlephobia.com/result?p=@aureooms/js-merging)


Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-merging
# or
jspm install npm:@aureooms/js-merging
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-merging
```

### bower
```terminal
bower install @aureooms/js-merging
```

### ender
```terminal
ender add @aureooms/js-merging
```

### jam
```terminal
jam install @aureooms/js-merging
```

### spm
```terminal
spm install @aureooms/js-merging --save
```

### npm
```terminal
npm install @aureooms/js-merging --save
```

## Require
### jspm
```js
let merging = require( "github:aureooms/js-merging" ) ;
// or
import merging from '@aureooms/js-merging' ;
```
### duo
```js
let merging = require( "aureooms/js-merging" ) ;
```

### component, ender, spm, npm
```js
let merging = require( "@aureooms/js-merging" ) ;
```

### bower
The script tag exposes the global variable `merging`.
```html
<script src="bower_components/@aureooms/js-merging/js/dist/merging.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "@aureooms/js-merging" ] , function ( merging ) { ... } ) ;
```

## Use

```js
/** array sequential merge */
let merge = merging.tapemerge ;

/** iterables sequential merg */
let merge = merging.iterables ;

/** generic template for a merging algorithm */
merging.merge ;
// for example
let array = require( "@aureooms/js-array" ) ;
let search = require( "@aureooms/js-search" ) ;
let merge = merging._merge( search.binarysearch , array.copy ) ;

/** Hwang-Lin algorithm (static version)*/
let merge = merging._hlstatic( search.binarysearch , array.copy ) ;
```
