'use strict'

const Pipeline = require('../lib/pipeline')

Object.toPipeline = function(obj, fn, self) {
    return Pipeline.fromObject(...arguments)
}