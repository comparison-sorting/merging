# Usage

> :warning: The code needs a ES2015+ polyfill to run (`regeneratorRuntime`),
> for instance [@babel/polyfill](https://babeljs.io/docs/usage/polyfill).

First, require the polyfill at the entry point of your application
```js
require( '@babel/polyfill' ) ;
// or
import '@babel/polyfill' ;
```

Then, import the library where needed
```js
const merging = require( '@aureooms/js-merging' ) ;
// or
import * as merging from '@aureooms/js-merging' ;
```
