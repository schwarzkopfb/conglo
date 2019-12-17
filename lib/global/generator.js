'use strict'

const AsyncIterable = require('../AsyncIterable'),
      Generator = Object.getPrototypeOf(/* istanbul ignore next */function* () {})

Generator.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}

