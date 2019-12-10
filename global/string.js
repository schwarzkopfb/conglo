'use strict'

const Pipeline = require('../lib/pipeline')

String.prototype.toPipeline = function() {
    return new Pipeline(this)
}