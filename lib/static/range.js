'use strict'

const { equal, notEqual } = require('assert'),
      { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(range)

function* range(from, to, step) {
    if (step === undefined)
        step = 1

    switch (arguments.length) {
        case 0: 
            return // todo: TBD throw an err?

        case 1:
            [ to, from ] = [ from, 0 ]

        case 2:
        case 3:
            equal(typeof from, 'number', '`from` must be a number')
            equal(typeof to, 'number', '`to` must be a number')
            equal(typeof step, 'number', '`step` must be a number')

            if (step > 0)
                for (let n = from; n < to; n += step)
                    yield n
            else if (step < 0)
                for (let n = from; n > to; n += step)
                    yield n
            else
                notEqual(step, 0, '`step` cannot be zero')
    }
}