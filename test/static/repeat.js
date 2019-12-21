'use strict'

const test = require('tap'),
      { repeat } = require('../..')

test.plan(3)

test.test('infinite', test => {
    test.plan(2)
    
    ;(async () => {
        const arr = []
        let i = 42

        for await (const item of repeat(42))
            if (i-- > 0)
                arr.push(item)
            else
                break

        test.same(arr.length, 42, 'repeat should yield the same value infinitely')
        test.same(arr, new Array(42).fill(42), 'repeat should yield the same value infinitely')
    })()
})

test.test('finite', test => {
    test.plan(2)
    
    ;(async () => {
        const arr = await repeat(42, 42).toArray()

        test.same(arr.length, 42, 'repeat should yield the same value `n` times')
        test.same(arr, new Array(42).fill(42), 'repeat should yield the same value `n` times')
    })()
})

test.test('assertions', test => {
    test.plan(4)

    test.rejects(repeat(1, 'invalid').next(), TypeError, 'repeat() should require a number for `n`')
    test.rejects(repeat(1, 1.1, 1).next(), RangeError, 'repeat() should require an integer for `n`')
    test.rejects(repeat(1, Infinity).next(), RangeError, 'repeat() should require an integer for `n`')
    test.rejects(repeat(1, -1).next(), RangeError, 'repeat() should require a non-negative number for `n`')
})