'use strict'

const { iterator, asyncIterator } = Symbol,
      { custom: inspect } = require('util').inspect,
      { toAsyncIterator } = require('./utils'),
      { fail } = require('./assert')

class AsyncIterable {
    constructor(source) {
        if (arguments.length === 0)
            source = []

        this[ asyncIterator ] = toAsyncIterator(source)
    }

    get [ iterator ]() { 
        return () => fail(Error, 'cannot synchronously iterate an AsyncIterable instance', 'sync_iter')
    }

    // AsyncIterable has an inspect() method with its own purpose - so without this, a warning will arise:
    // '[DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated'
    [ inspect ]() {
        return 'AsyncIterable {}'
    }
}

// keep it here, circular refs!
module.exports = AsyncIterable

// keep it here, circular refs!
const mixin = require('./mixin')

mixin(AsyncIterable.prototype, require('./proto'))
mixin(AsyncIterable, require('./static'))
