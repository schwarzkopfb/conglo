'use strict'

module.exports = mixin

function mixin(klass) {
    [
        'fromMap',
        'fromObject',
        'repeat',
        'range'
    ]
        .forEach(name => klass[ name ] = require(`./${name}`))
}
