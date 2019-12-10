'use strict'

module.exports = Pipeline

const { iterator, asyncIterator } = Symbol,
      { custom: inspect } = require('util').inspect,
      { toAsyncIterator } = require('./utils')

function Pipeline(source) {
    // make `new` optional
    if (!(this instanceof Pipeline))
        return new Pipeline(source)

    if (arguments.length === 0)
        source = []

    this[ asyncIterator ] = toAsyncIterator(source)
}

require('./proto')(Pipeline)
require('./static')(Pipeline)

// Pipeline has an inspect() method with its own purpose so without this, a warning will arise:
// [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated
Pipeline.prototype[ inspect ] = () => 'Pipeline {}'

Object.defineProperty(Pipeline.prototype, iterator, {
    get: () => function*() {
        throw new Error(
            'cannot synchronously iterate a Pipeline object' + '\n' +
            'try to use `for await...of` or `await ...toArray()`' + '\n' +
            'see <troubleshooting link> for more information' + '\n' // todo: add troubleshooting link
        ) 
    }
})

