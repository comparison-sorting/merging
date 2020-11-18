# Examples

> More examples in [the test files](https://github.com/aureooms/js-merging/tree/main/test/src).

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
