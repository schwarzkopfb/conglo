'use strict'

const AsyncIterable = require('../lib/AsyncIterable'),
      Generator = Object.getPrototypeOf(/* istanbul ignore next */function* () {})

Generator.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}

