'use strict'

const AsyncIterable = require('../AsyncIterable')

module.exports = empty

function empty() {
    return new AsyncIterable
}