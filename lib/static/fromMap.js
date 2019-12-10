'use strict'

module.exports = fromMap

const assert = require('assert'),
      Pipeline = require('../pipeline')

function fromMap(map, fn, self) {
    assert(map instanceof Map, 'a Map instance must be provided')

    if (arguments.length === 1)
        return new Pipeline(map.entries())
    else {
        assert.equal(typeof fn, 'function', 'when provided, second argument must be a function')

        function* inner() {
            let i = 0
            for (const [ key, value ] of map)
                yield fn.call(self, key, value, i++)
        }

        return new Pipeline(inner())
    }
}