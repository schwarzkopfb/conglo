'use strict'

const { equal } = require('assert')

first.aliases = [ 'find' ]
module.exports = first

async function first(fn, self) {
    if (arguments.length > 0) {
        equal(typeof fn, 'function', 'when provided, predicate must be a function')

        let i = 0

        for await (const item of this)
            if (await fn.call(self, item, i++))
                return item
    }
    else
        for await (const item of this)
            return item
}