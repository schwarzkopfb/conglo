'use strict'

;[
    'string',
    'object',
    'array',
    'set',
    'map',
    'promise',
    'generator',
    'asyncGenerator'
]
    .forEach(name => require(`./${name}`))