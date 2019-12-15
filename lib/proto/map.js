'use strict'

const { equal } = require('assert'),
      toAsyncIterableFactory = require('../chainFactory')

module.exports = toAsyncIterableFactory(map)

async function* map(fn, self) {
    equal(typeof fn, 'function', 'selector passed to map() must be a function')

    let i = 0

    for await (const item of this)
        yield await fn.call(self, item, i++)
}