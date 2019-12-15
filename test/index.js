'use strict'

return require('tap').pass('ok')

const Pipeline = require('..'),
      { repeat, range } = Pipeline

new Pipeline('hello')

Promise
    .resolve('hello')
    .toAsyncIterable()

new Set([ 1, 2, 3 ])
    .toAsyncIterable()

const map = new Map([ [ 1, 'one' ], [ 2, 'two' ] ])

map
    .toAsyncIterable((k, v, i) => i)
    .toArray()
    .then(console.log)

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function* repeatSlowly(val, n) {
    for await (const item of repeat(val, n)) {
        await delay(10)
        yield item
    }
}

repeatSlowly(4, 3)
    .toAsyncIterable()
    .toArray()
    .then(console.log)

const obj = {
    a: 1,
    b: 2,
    c: 3
}

Pipeline
    .fromObject(obj, (k, v) => v)
    .map(v => v ** 2)
    .toArray()
    .then(console.log)

Pipeline(obj)
    .toArray()
    .then(console.log)

range(1, 5)
    .toArray()
    .then(console.log)

range(3)
    .cycle()
    .takeWhile((v, i) => i < 5 && v < 2)
    .map(v => -v)
    .toSet()
    .then(n => console.log('takeWhile', n))

range(10)
    .slice(3)
    .map(n => n ** 2)
    .every(n => n >= 9)
    .then(console.log)

Object
    .toAsyncIterable({
        oa: 1,
        ob: 2,
        oc: 3
    }, (k, v) => `tp_${k}_${v}`)
    .all(k => k.startsWith('t'))
    .then(console.log)

range(10)
    .filter(n => n % 3 === 0)
    .toObject((n, i) => String.fromCharCode(97 + i))
    .then(console.log)

range(2)
    .any(n => n > 3)
    .then(r => console.log('any', r))

function* test() {
    yield 'gen'
}

async function* test2() {
    yield 'async gen'
}

range(3)
    .concat(range(3, 4), 'a', [ 4, 4 ], new Set([ 4, 6, 9 ]), test(), test2(), Promise.resolve(9))
    .sum()
    // .toSet()
    .then(n => console.log('count', n))

range(4)
    .reverse()
    .last()
    .then(n => console.log('first', n))

range(4, 10)
    .take(2)
    .toArray()
    .then(n => console.log('take', n))

range(10)
    .empty()
    .toArray()
    .then(n => console.log('empty', n))

range(3)
    .append(3, Promise.resolve(4), [ 5 ])
    .toArray()
    .then(n => console.log('append', n))
    
range(4, 6)
    .prepend(1, Promise.resolve(2), [ 3 ])
    .toArray()
    .then(n => console.log('prepend', n))

const ref = {}

;[ 1, 'a', ref, NaN ]
    .toAsyncIterable()
    .includes('string', 1, (val, item) => typeof item === val)
    .then(r => console.log('includes', r))

;[ 78, 92, 100, 37, 81 ]
    .toAsyncIterable()
    .map(n => ({ n }))
    .average(o => o.n)
    .then(a => console.log('average', a))
