'use strict'

const { 
          assertObject,
          assertFunction
      } = require('../assert'),
      { toAsyncIterableFactory } = require('../utils')

module.exports = toAsyncIterableFactory(fromObject)

function* fromObject(obj, fn, self) {
    assertObject(obj, 'an object instance must be provided')

    const entries = Object.entries(obj)

    if (arguments.length === 1)
        yield* entries
    else {
        assertFunction(fn, 'when provided, second argument must be a selector function')

        let i = 0

        for (const [ key, value ] of entries)
            yield fn.call(self, key, value, i++)
    }
}