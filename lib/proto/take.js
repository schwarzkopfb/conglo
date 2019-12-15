'use strict'

const { equal } = require('assert'),
      toAsyncIterableFactory = require('../chainFactory')

take.aliases = [ 'limit' ]
module.exports = toAsyncIterableFactory(take)

async function* take(n) {
    equal(typeof n, 'number', '`n` must be a number')

    let i = 0
    
    for await (const item of this)
        if (i++ < n)
            yield item
        else
            break
}