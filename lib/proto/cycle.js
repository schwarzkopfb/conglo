'use strict'

const { equal } = require('assert'),
      toAsyncIterableFactory = require('../chainFactory')

module.exports = toAsyncIterableFactory(cycle)

async function* cycle(n) {
    const arr = []

    for await (const item of this) {
        yield item
        arr.push(item)
    }

    if (arr.length === 0)
        return

    if (arguments.length > 0) {
        equal(typeof n, 'number', 'when provided, `n` must be a number')

        for (; --n > 0;)
            yield* arr
    }
    else
        while (true)
            yield* arr
}