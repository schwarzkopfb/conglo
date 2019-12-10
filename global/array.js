'use strict'

const Pipeline = require('../lib/pipeline')

Array.prototype.toPipeline = function() {
    return new Pipeline(this)
}