'use strict'

const { iterator, asyncIterator } = Symbol,
      { custom: inspect } = require('util').inspect,
      { toAsyncIteratorFactory } = require('./utils'),
      { 
          assertNumber, 
          assertNonNegative, 
          fail 
      } = require('./assert'),
      mil = Symbol('maxIterationLength'),
      dmil = Symbol('defaultMaxIterationLength')

class AsyncIterable {
    constructor(source) {
        if (arguments.length === 0)
            source = []

        this[ asyncIterator ] = addInfGuardDevOnly(toAsyncIteratorFactory(source))
    }

    setMaxIterationLength(n) {
        assertNumber(n, 'maxIterationLength must be a number')
        assertNonNegative(n, 'maxIterationLength must be greater than or equal to zero')

        this[ mil ] = n
        
        return this
    }

    static get defaultMaxIterationLength() {
        return this[ dmil ] || 100000
    }

    static set defaultMaxIterationLength(n) {
        assertNumber(n, 'defaultMaxIterationLength must be number')
        assertNonNegative(n, 'defaultMaxIterationLength cannot be negative')

        this[ dmil ] = n
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

const addInfGuardDevOnly = process.env.NODE_ENV === 'production'
    ? getIterator => getIterator
    : getIterator => infiniteIterationGuard(getIterator)

function infiniteIterationGuard(getIterator) {
    return async function*() {
        const max = this[ mil ]

        let i = max === undefined
            ? AsyncIterable.defaultMaxIterationLength
            : max

        for await (const item of getIterator()) {
            if (i-- <= 0)
                throw new Error('potential infinite iteration detected') // TODO: use fail(), add troubleshooting link

            yield item
        }
    }
}

// keep it here, circular refs!
module.exports = AsyncIterable

// keep it here, circular refs!
const mixin = require('./mixin')

mixin(AsyncIterable.prototype, require('./proto'))
mixin(AsyncIterable, require('./static'))
