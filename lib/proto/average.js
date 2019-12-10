'use strict'

const { equal } = require('assert')

module.exports = average

async function average(fn, self) {
    let i = 0,
        s = 0

    if (arguments.length > 0) {
        equal(typeof fn, 'function', 'when provided, selector must be a function')

        for await (const item of this)
            // `|| 0` is to ignore NaNs
            s += +await fn.call(self, item, i++) || 0
    }
    else
        for await (const item of this) {
            // `|| 0` is to ignore NaNs
            s += +item || 0
            i++
        }

    return s / i
}