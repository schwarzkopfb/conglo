'use strict'

module.exports = mixin

const fns = [
    'map',
    'take',
    'takeWhile',
    'cycle',
    'toArray',
    'toSet',
    'toMap',
    'toObject',
    'slice',
    'every',
    'some',
    'filter',
    'concat',
    'count',
    'sum',
    'reverse',
    'first',
    'last',
    'empty',
    'append',
    'prepend',
    'includes',
    'average',
    'inspect',
    'sort',
    'join',
    'distinct',
    'step',
    'nth'
]

function mixin({ prototype }) {
    for (const name of fns) {
        const fn = require('./' + name)

        prototype[ name ] = fn

        if (fn.aliases)
            for (const alias of fn.aliases)
                prototype[ alias ] = fn
    }
}
