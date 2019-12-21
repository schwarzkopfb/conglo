'use strict'

const test = require('tap'),
      { 
          append, 
          average,
          concat,
          count,
          cycle,
          distinct,
          empty,
          every,
          filter,
          first,
          includes,
          inspect,
          join,
          last,
          map,
          next,
          nth,
          prepend,
          reverse,
          slice,
          some,
          sort,
          step,
          sum,
          take,
          takeWhile,
          toArray,
          toMap,
          toObject,
          toSet
      } = require('../../lib/proto')

test.resolveMatch(
    [ 1, 2 ]::append(3)::toArray(), [ 1, 2, 3 ],
    'append() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::average(), 2,
    'average() should be used with overwritten this'
)

test.resolveMatch(
    [ 1 ]::concat([ 2 ], 3)::toArray(), [ 1, 2, 3 ],
    'concat() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::count(), 3,
    'count() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2 ]::cycle(3)::toArray(), [ 1, 2, 1, 2, 1, 2 ],
    'cycle() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 1, 3, 3 ]::distinct()::toArray(), [ 1, 2, 3 ],
    'distinct() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::empty()::toArray(), [],
    'empty() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::every(n => n % 2), false,
    'every() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::filter(n => n % 2)::toArray(), [ 1, 3 ],
    'filter() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::first(n => n > 1), 2,
    'first() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::includes(2), true,
    'includes() should be used with overwritten this'
)

test.test('inspect()', test => {
    test.plan(2)

    const orig = console.log

    console.log = function (label, arr) {
        test.same(label, 'look')
        test.same(arr, [ 1 ])
    }

    ;[ 1 ]::inspect('look')::next().then(() => console.log = orig)
})

test.resolveMatch(
    [ 1, 2, 3 ]::join('-'), '1-2-3',
    'join() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::last(), 3,
    'last() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::map(n => n ** 2)::toArray(), [ 1, 4, 9 ],
    'map() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::next(), 1,
    'next() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::nth(1), 2,
    'nth() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2 ]::prepend(0)::toArray(), [ 0, 1, 2 ],
    'prepend() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::reverse()::toArray(), [ 3, 2, 1 ],
    'reverse() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::slice(1)::toArray(), [ 2, 3 ],
    'slice() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::some(n => n > 2), true,
    'some() should be used with overwritten this'
)

test.resolveMatch(
    [ 2, 1, 3 ]::sort()::toArray(), [ 1, 2, 3 ],
    'sort() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::step(2)::toArray(), [ 1, 3 ],
    'step() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::sum(), 6,
    'sum() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::take(2)::toArray(), [ 1, 2 ],
    'take() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 3 ]::takeWhile(n => n % 2 !== 0)::toArray(), [ 1 ],
    'takeWhile() should be used with overwritten this'
)

test.resolveMatch(
    new Set([ 1, 2, 1, 3, 3 ])::toArray(), [ 1, 2, 3 ],
    'toArray() should be used with overwritten this'
)

test.resolveMatch(
    new Set([ 1, 2, 1, 3, 3 ])::toMap((v, i) => String.fromCharCode(97 + i)), 
    new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]),
    'toMap() should be used with overwritten this'
)

test.resolveMatch(
    new Set([ 1, 2, 1, 3, 3 ])::toObject((v, i) => String.fromCharCode(98 + i)), 
    { b: 1, c: 2, d: 3 },
    'toObject() should be used with overwritten this'
)

test.resolveMatch(
    [ 1, 2, 1, 3, 3 ]::toSet(), new Set([ 1, 2, 3 ]),
    'toSet() should be used with overwritten this'
)

test.resolveMatch(
    [ 1 ]
        ::append(2)
        ::concat([ 3 ])
        ::map(n => n ** n)
        ::reverse()
        ::sort()
        ::cycle(2)
        ::distinct()
        ::filter(n => n > 1)
        ::sum()
        .then(n => n + 11),
    42,
    'prototype methods should be chained with overwritten this'
)