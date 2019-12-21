'use strict'

const test = require('tap'),
      { range } = require('../..')

test.resolveMatch(range().toArray(), [], 'empty range should return an empty array')
test.resolveMatch(range(5).toArray(), [ 0, 1, 2, 3, 4 ], 'range to')
test.resolveMatch(range(2, 5).toArray(), [ 2, 3, 4 ], 'range from -> to')
test.resolveMatch(range(0, 5, 2).toArray(), [ 0, 2, 4 ], 'range from -> to, by step')
test.resolveMatch(range(5, 0, -1).toArray(), [ 5, 4, 3, 2, 1 ], 'range from -> to, by step, decreasing')
test.resolveMatch(range(-3).toArray(), [], 'range to, negative step')

test.test('assertions', test => {
    test.plan(11)

    test.rejects(range('invalid').next(), 'reange() should require a number for `to`')
    test.rejects(range(Infinity).next(), 'reange() should require a finite number for `to`')
    
    test.rejects(range(Infinity, 2).next(), 'reange() should require a finite number for both `from` and `to`')
    test.rejects(range(1, Infinity).next(), 'reange() should require a finite number for both `from` and `to`')

    test.rejects(range(1, 2, 'invalid').next(), 'reange() should require a finite number for both `from`, `to` and `step`')
    test.rejects(range(1, 'invalid', 1).next(), 'reange() should require a finite number for both `from`, `to` and `step`')
    test.rejects(range('invalid', 2, 1).next(), 'reange() should require a finite number for both `from`, `to` and `step`')
    test.rejects(range(1, 2, Infinity).next(), 'reange() should require a finite number for both `from`, `to` and `step`')
    test.rejects(range(1, Infinity, 1).next(), 'reange() should require a finite number for both `from`, `to` and `step`')
    test.rejects(range(Infinity, 2, 1).next(), 'reange() should require a finite number for both `from`, `to` and `step`')

    test.rejects(range(1, 2, 0).next(), '`step` should be asserted')
})
