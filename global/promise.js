'use strict'

const Pipeline = require('../lib/pipeline')

Promise.prototype.toPipeline = function() {
    return new Pipeline(this)
}