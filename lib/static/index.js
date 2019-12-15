'use strict'

module.exports = mixin

const toAsyncIterableFactory = require('../chainable')

function mixin(klass) {
    [
        'fromMap',
        'fromObject',
        'repeat',
        'range'
    ]
        .forEach(name => {
            let fn = require('./' + name)
            fn = fn.chainable
                ? toAsyncIterableFactory(fn)
                : fn

            klass[ name ] = fn
        })
}
