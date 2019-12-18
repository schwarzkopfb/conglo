'use strict'

const { 
          assertNumber,
          assertNonNegative,
          assertInteger
      } = require('../assert')

take.chainable = true
take.aliases = [ 'limit' ]
module.exports = take

async function* take(n) {
    assertNumber(n, '`n` must be a number')
    // take(0)  has the same effect as calling empty(), but however
    assertNonNegative(n, '`n` must be greater than er equal to zero')
    assertInteger(n, '`n` must be an integer')

    let i = 0
    
    for await (const item of this)
        if (i++ < n)
            yield item
        else
            break
}