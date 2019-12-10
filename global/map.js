'use strict'

const Pipeline = require('../lib/pipeline')

Map.prototype.toPipeline = function(fn, self) {
    return Pipeline.fromMap(this, ...arguments)
}