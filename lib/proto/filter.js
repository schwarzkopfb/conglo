'use strict'

const { equal } = require('assert'),
      toAsyncIterableFactory = require('../chainFactory')

module.exports = toAsyncIterableFactory(filter)

async function* filter(fn, self) {
    equal(typeof fn, 'function', 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if (await fn.call(self, item, i++))
            yield item
}