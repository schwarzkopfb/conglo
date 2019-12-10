'use strict'

const { equal } = require('assert'),
      { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(filter)

async function* filter(fn, self) {
    equal(typeof fn, 'function', 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if (await fn.call(self, item, i++))
            yield item
}