'use strict'

const { equal } = require('assert'),
      { toAsyncIterableFactory } = require('../utils')

module.exports = toAsyncIterableFactory(repeat)

function* repeat(val, n) {
    if (arguments.length < 2)
        while (true)
            yield val
    else {
        equal(typeof n, 'number', 'when provided, `n` must be a number')

        for (let i = 0; i < n; i++)
            yield val
    }
}