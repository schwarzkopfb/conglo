'use strict'

const AsyncIterable = require('../AsyncIterable')

from.chainable = true
module.exports = from

function from(source) {
    return new AsyncIterable(source)
}