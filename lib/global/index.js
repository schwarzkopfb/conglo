'use strict'

;[
    'array',
    'asyncGenerator',
    'constructor',
    'generator',
    'map',
    'object',
    'promise',
    'set',
    'string'
]
    .forEach(name => require(`./${name}`))