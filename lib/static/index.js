'use strict'

module.exports = mixin

const toAsyncIterableFactory = require('../chainable')

function mixin(klass) {
    [
        'from',
        'fromMap',
        'fromObject',
        'range',
        'repeat'
    ]
        .forEach(name => {
            let fn = require('./' + name)
            fn = fn.chainable
                ? toAsyncIterableFactory(fn)
                : fn

            klass[ name ] = fn
        })
}
