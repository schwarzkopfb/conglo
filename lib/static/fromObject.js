'use strict'

module.exports = fromObject

const assert = require('assert'),
      Pipeline = require('../pipeline')

function fromObject(obj, fn, self) {
    assert.equal(typeof obj, 'object', 'an object instance must be provided')

    const entries = Object.entries(obj)

    if (arguments.length === 1)
        return new Pipeline(entries)
    else {
        assert.equal(typeof fn, 'function', 'when provided, second argument must be a function')

        function* inner() {
            let i = 0
            for (const [ key, value ] of entries)
                yield fn.call(self, key, value, i++)
        }

        return new Pipeline(inner())
    }
}