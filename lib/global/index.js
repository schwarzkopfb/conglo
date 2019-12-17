'use strict'

;[
    'array',
    'asyncGenerator',
    'generator',
    'map',
    'object',
    'promise',
    'set',
    'string'
  ]
    .forEach(name => require(`./${name}`))