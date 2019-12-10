'use strict'

const Pipeline = require('../lib/pipeline'),
      Generator = Object.getPrototypeOf(function* () {})

Generator.prototype.toPipeline = function() {
    return new Pipeline(this)
}

