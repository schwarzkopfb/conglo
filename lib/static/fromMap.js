'use strict'

const {
          assertInstanceOf,
          assertFunction
      } = require('../assert'),
      toAsyncIterableFactory = require('../chainFactory')

module.exports = toAsyncIterableFactory(fromMap)

function* fromMap(map, fn, self) {
    assertInstanceOf(map, Map, 'a Map instance must be provided')

    if (arguments.length === 1)
        yield* map.entries()
    else {
        assertFunction(fn, 'when provided, second argument must be a selector function')

        let i = 0

        for (const [ key, value ] of map)
            yield fn.call(self, key, value, i++)
    }
}