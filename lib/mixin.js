'use strict'

module.exports = mixin

const toAsyncIterableFactory = require('./chainable')

function mixin(obj, methodsDescriptor) {
    for (const [ name, fn ] of Object.entries(methodsDescriptor))
        obj[ name ] = fn.chainable
            ? toAsyncIterableFactory(fn)
            : fn
}