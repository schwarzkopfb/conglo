'use strict'

const { assertFunction } = require('../assert')

takeWhile.chainable = true
module.exports = takeWhile

async function* takeWhile(fn, self) {
    assertFunction(fn, 'predicate must be a function')
    
    let i = 0
    
    for await (const item of this)
        if (await fn.call(self, item, i++))
            yield item
        else
            break
}