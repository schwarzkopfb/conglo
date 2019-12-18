'use strict'

const { 
          fail,
          assertFiniteNumber
      } = require('../assert')

range.chainable = true
module.exports = range

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
            assertFiniteNumber(from, '`from` must be a finite number')
            assertFiniteNumber(to, '`to` must be a finite number')
            assertFiniteNumber(step, '`step` must be a finite number')

            if (step > 0)
                for (let n = from; n < to; n += step)
                    yield n
            else if (step < 0)
                for (let n = from; n > to; n += step)
                    yield n
            else
                fail(RangeError, '`step` cannot be zero')
    }
}