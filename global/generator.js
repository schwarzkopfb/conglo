'use strict'

const Pipeline = require('../lib/pipeline'),
      Generator = Object.getPrototypeOf(/* istanbul ignore next */function* () {})

Generator.prototype.toPipeline = function() {
    return new Pipeline(this)
}

