'use strict'

const { equal } = require('assert'),
      { toPipelineFactory } = require('../utils')

take.aliases = [ 'limit' ]
module.exports = toPipelineFactory(take)

async function* take(n) {
    equal(typeof n, 'number', '`n` must be a number')

    let i = 0
    
    for await (const item of this)
        if (i++ < n)
            yield item
        else
            break
}