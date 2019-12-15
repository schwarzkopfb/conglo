'use strict'

module.exports = AsyncIterable

const { iterator, asyncIterator } = Symbol,
      { custom: inspect } = require('util').inspect,
      { toAsyncIterator } = require('./utils')

function AsyncIterable(source) {
    // make `new` optional
    if (!(this instanceof AsyncIterable))
        return new AsyncIterable(source)

    if (arguments.length === 0)
        source = []

    this[ asyncIterator ] = toAsyncIterator(source)
}

require('./proto')(AsyncIterable)
require('./static')(AsyncIterable)

// AsyncIterable has an inspect() method with its own purpose so without this, a warning will arise:
// [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated
AsyncIterable.prototype[ inspect ] = () => 'AsyncIterable {}'

Object.defineProperty(AsyncIterable.prototype, iterator, {
    get: () => function*() {
        throw new Error(
            'cannot synchronously iterate an AsyncIterable instance' + '\n' +
            'try to use `for await...of` or `await ...toArray()`' + '\n' +
            'see <troubleshooting link> for more information' + '\n' // todo: add troubleshooting link
        ) 
    }
})

