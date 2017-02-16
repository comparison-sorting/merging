[js-merging](http://aureooms.github.io/js-merging)
==

Merging code bricks for JavaScript. Parent is
[aureooms/js-sort](https://github.com/aureooms/js-sort).

```js
merging.iterables( compare.increasing , count( 0 , 2 ) , count( 1 , 3 ) ) ;
// 0 1 2 4 4 6 7 8 10 10 ...
```

[![NPM license](https://img.shields.io/npm/l/@aureooms/js-merging.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-merging/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-merging.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-merging)
[![Bower version](https://img.shields.io/bower/v/@aureooms/js-merging.svg?style=flat)](http://bower.io/search/?q=@aureooms/js-merging)
[![Build Status](https://img.shields.io/travis/aureooms/js-merging.svg?style=flat)](https://travis-ci.org/aureooms/js-merging)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-merging.svg?style=flat)](https://coveralls.io/r/aureooms/js-merging)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-merging.svg?style=flat)](https://david-dm.org/aureooms/js-merging#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-merging.svg?style=flat)](https://david-dm.org/aureooms/js-merging#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-merging.svg?style=flat)](https://codeclimate.com/github/aureooms/js-merging)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-merging.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-merging)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-merging.svg?style=flat)](https://github.com/aureooms/js-merging/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-merging.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-merging)


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
