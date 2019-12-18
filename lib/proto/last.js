'use strict'

const { assertFunction } = require('../assert')

module.exports = last

async function last(fn, self) {
    let item

    if (arguments.length > 0) {
        assertFunction(fn, 'predicate must be a function')

        let last, i = 0

        for await (item of this)
            if (await fn.call(self, item, i++))
                last = item

        return last
    }
    else {
        for await (item of this);
        return item
    }
}