'use strict'

const Pipeline = require('../lib/pipeline')

Set.prototype.toPipeline = function() {
    return new Pipeline(this)
}