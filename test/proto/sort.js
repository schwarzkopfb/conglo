'use strict'

const test = require('tap'),
      AsyncIterable = require('../..')

// test.plan(26)
test.plan(25)

test.test('aliases', test => {
    const instance = [].toAsyncIterable()

    test.same(instance.sort, instance.sortBy)
    test.same(instance.sort, instance.order)
    test.same(instance.sort, instance.orderBy)

    test.end()
})


const data = [
    { char: 'c', number: 3, emoji: '😀' },
    { char: 'c', number: 2, emoji: '😃' },
    { char: 'd', number: 4, emoji: '😄' },
    { char: 'b', number: 5, emoji: '😁' },
    { char: 'c', number: 1, emoji: '😆' },
    { char: 'a', number: 7, emoji: '😅' },
    { char: 'b', number: 6, emoji: '🤣' }
]

test.resolveMatch(
    new AsyncIterable(data)
        .map(e => e.char)
        .sort()
        .toArray(),
    [ 'a', 'b', 'b', 'c', 'c', 'c', 'd' ],
    'without arguments'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(e => e.char)
        .order(false)
        .toArray(),
    [ 'a', 'b', 'b', 'c', 'c', 'c', 'd' ],
    'default comparer, ascending order, explicitly specified'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(e => e.char)
        .order(true)
        .toArray(),
    [ 'd', 'c', 'c', 'c', 'b', 'b', 'a' ],
    'default comparer but descending order'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(e => e.char)
        .order({ desc: true })
        .toArray(),
    [ 'd', 'c', 'c', 'c', 'b', 'b', 'a' ],
    'default comparer but descending order with object descriptor'
)

// TODO
// different behavior between Node 10 & 12 ?!
// test.resolveMatch(
//     [ 'a', 1, null, 2, false, undefined ]
//         .toAsyncIterable()
//         .sort()
//         .toArray(),
//     [ 1, 2, 'a', false, null, undefined ],
//     'array containing various types'
// )

test.resolveMatch(
    new AsyncIterable(data)
        .sortBy({ field: 'char' })
        .toArray(),
    [
        { char: 'a', number: 7, emoji: '😅' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'd', number: 4, emoji: '😄' }
    ],
    'by string property, ascending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .orderBy({ field: 'char', d: true })
        .toArray(),
    [
        { char: 'd', number: 4, emoji: '😄' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'a', number: 7, emoji: '😅' }
    ],
    'by string property, descending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .sort('number')
        .toArray(),
    [
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'd', number: 4, emoji: '😄' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'a', number: 7, emoji: '😅' }
    ],
    'by numberic property, string descriptor, ascending'
)

const field = Symbol('number')

test.resolveMatch(
    new AsyncIterable(data)
        .map(({ number }) => ({
            [ field ]: number
        }))
        .sort(field)
        .map(item => item[ field ])
        .toArray(),
    [ 1, 2, 3, 4, 5, 6, 7 ],
    'by numberic property, symbol descriptor, ascending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(({ number }) => ({
            [ field ]: number
        }))
        .sort({ field, desc: true })
        .map(item => item[ field ])
        .toArray(),
        [ 7, 6, 5, 4, 3, 2, 1 ],
    'by numberic property, symbol descriptor, descending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .sort({ field: 'number', desc: 1 })
        .toArray(),
    [
        { char: 'a', number: 7, emoji: '😅' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'd', number: 4, emoji: '😄' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 1, emoji: '😆' }
    ],
    'by numberic property, descending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .sort({ field: 'char' }, { field: 'number', descending: 'yes' })
        .toArray(),
    [
        { char: 'a', number: 7, emoji: '😅' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'd', number: 4, emoji: '😄' }
    ],
    'first by string prop ascending, then by numeric prop descending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .sort({ field: 'char' }, { field: 'emoji', d: 1 })
        .toArray(),
    [
        { char: 'a', number: 7, emoji: '😅' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'd', number: 4, emoji: '😄' },
    ],
    'first by string prop ascending, then by emoji prop descending'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(el => {
            // in JS, empty string is a valid field name
            el[ '' ] = el[ 'number' ]
            return el
        })
        .sort('')
        .map(({ number }) => number)
        .toArray(),
    [ 1, 2, 3, 4, 5, 6, 7 ],
    'ordering by an empty string field name'
)

test.resolveMatch(
    new AsyncIterable([
        [ 'o', 3 ],
        [ 'e', 0 ],
        [ 'l', 1 ],
        [ 'h', -1 ],
        [ 'l', 2 ]
    ])
        .sort(1)
        .map(a => a[ 0 ])
        .join(''),
    'hello',
    'by array index, numeric ascending'
)

test.resolveMatch(
    new AsyncIterable([
        [ 'o', 3 ],
        [ 'e', 0 ],
        [ 'l', 1 ],
        [ 'h', -1 ],
        [ 'l', 2 ]
    ])
        .sort({ i: 1 })
        .map(a => a[ 0 ])
        .join(''),
    'hello',
    'by array index with descriptor, numeric ascending'
)

test.resolveMatch(
    new AsyncIterable([
        [ 'h', 3 ],
        [ 'l', 0 ],
        [ 'l', 1 ],
        [ 'o', -1 ],
        [ 'e', 2 ]
    ])
        .sort({ index: 1, desc: true })
        .map(a => a[ 0 ])
        .join(''),
    'hello',
    'by array index with descriptor, numeric descending'
)

test.resolveMatch(
    'álaoőo'.toAsyncIterable().sort().join(''),
    'aálooő',
    'accented characters'
)

test.resolveMatch(
    new AsyncIterable(data).sort(({ number }) => number).toArray(),
    [
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'd', number: 4, emoji: '😄' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'a', number: 7, emoji: '😅' }
    ],
    'direct selector'
)

test.resolveMatch(
    'álaoőo'
        .toAsyncIterable()
        .sort({ comparer: (a, b) => a > b ? 1 : a < b ? -1 : 0 })
        .join(''),
    'alooáő',
    'custom comparer'
)

test.resolveMatch(
    new AsyncIterable(data)
        .sort(
            { selector: ({ char }) => char, d: true },
            'number'
        )
        .toArray(),
    [
        { char: 'd', number: 4, emoji: '😄' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'a', number: 7, emoji: '😅' }
    ],
    'by custom selector (descending) then by field (ascending)'
)

test.resolveMatch(
    new AsyncIterable(data)
        .append({ char: 'c', number: 1, emoji: '😀' },)
        .sort(
            { selector: ({ char }) => char },
            'number',
            { field: 'emoji', desc: true }
        )
        .toArray(),
    [
        { char: 'a', number: 7, emoji: '😅' },
        { char: 'b', number: 5, emoji: '😁' },
        { char: 'b', number: 6, emoji: '🤣' },
        { char: 'c', number: 1, emoji: '😆' },
        { char: 'c', number: 1, emoji: '😀' },
        { char: 'c', number: 2, emoji: '😃' },
        { char: 'c', number: 3, emoji: '😀' },
        { char: 'd', number: 4, emoji: '😄' }
    ],
    'by custom selector (ascending) then by field (ascending) then by field (descending)'
)

test.resolveMatch(
    new AsyncIterable(data)
        .map(item => new Map(Object.entries(item)))
        .sort(item => item.get('char'))
        .map(item => item.get('char'))
        .join(''),
    'abbcccd',
    'sorting an array of Maps'
)

test.test('custom localeCompare() options', test => {
    test.plan(4)

    const items = [ 'réservé', 'Premier', 'Cliché', 'communiqué', 'café', 'Adieu' ]

    test.resolveMatch(
        items.toAsyncIterable()
            .sortBy({ options: { locales: 'fr', ignorePunctuation: true } })
            .toArray(),
        [ 'Adieu', 'café', 'Cliché', 'communiqué', 'Premier', 'réservé' ],
        'case-insensitive sort of an array'
    )

    test.resolveMatch(
        items.toAsyncIterable()
            .sortBy({ options: { locales: 'fr', ignorePunctuation: true }, d: true })
            .toArray(),
        [ 'réservé', 'Premier', 'communiqué', 'Cliché', 'café', 'Adieu' ],
        'case-insensitive sort of an array, descending'
    )

    test.resolveMatch(
        items.toAsyncIterable()
            .map(str => ({ str }))
            .sortBy({ 
                selector: ({ str }) => str,
                descending: true,
                options: { locales: 'fr', ignorePunctuation: true }
             })
            .toArray(),
        [ 
            { str: 'réservé' }, 
            { str: 'Premier' },
            { str: 'communiqué' },
            { str: 'Cliché' },
            { str: 'café' },
            { str: 'Adieu' }
        ],
        'case-insensitive sort of an array, custom selector, descending'
    )

    test.resolveMatch(
        items.toAsyncIterable()
            .map(str => ({ str }))
            .sortBy({ 
                field: 'str',
                descending: true,
                options: { locales: 'fr', ignorePunctuation: true }
             })
            .toArray(),
        [ 
            { str: 'réservé' }, 
            { str: 'Premier' },
            { str: 'communiqué' },
            { str: 'Cliché' },
            { str: 'café' },
            { str: 'Adieu' }
        ],
        'case-insensitive sort of an array, by field, descending'
    )

    /* TODO: 
     * For some reason the below tests are working in a browser env,
     * but not in Node.js. There is some problem with the built-in
     * localeCompare() function itself. So cannot be fixed right now.
     */

    // in German, ä sorts before z
    // ;[ 'ä', 'a', 'z' ]
    //     .toAsyncIterable()
    //     .sort({ opts: { locales: 'de' } })
    //     .toArray()
    //     .then(arr => test.same(arr, [ 'a', 'ä', 'z' ]))

    // in Swedish, ä sorts after z
    // ;[ 'ä', 'a', 'z' ]
    //     .toAsyncIterable()
    //     .sort({ opts: { locales: 'sv' } })
    //     .toArray()
    //     .then(arr => test.same(arr, [ 'a', 'z', 'ä' ]))
})

test.test('assertions', test => {
    test.plan(23)

    function testRejection(desc, msg, errCtor) {
        test.rejects(new AsyncIterable().sort(desc).toArray(), errCtor, msg)
    }

    testRejection(null, 'null sorting descriptor', TypeError)
    testRejection(-1, 'negative number as sorting descriptor', RangeError)
    testRejection(0.1, 'non-integer number as sorting descriptor', RangeError)
    testRejection(Infinity, 'Infinity as sorting descriptor', RangeError)
    testRejection({ comp: true }, 'non-function comparer', TypeError)
    testRejection({ comp: () => {}, sel: () => {} }, 'comparer and selector together', RangeError)
    testRejection({ comp: () => {}, f: 'test' }, 'comparer and field name together', RangeError)
    testRejection({ comp: () => {}, i: 2 }, 'comparer and index together', RangeError)
    testRejection({ c: () => {}, desc: true }, 'descending order and comparer', RangeError)
    testRejection({ c: () => {}, o: { ignorePunctuation: true } }, 'options for localeCompare() and comparer', RangeError)
    testRejection({ field: 'test', s: () => {} }, 'field name and selector together', RangeError)
    testRejection({ field: {} }, 'non-string and non-symbol field name', TypeError)
    testRejection({ i: 0, s: () => {} }, 'index and selector together', RangeError)
    testRejection({ i: 0, f: 'test' }, 'index and field name together', RangeError)
    testRejection({ i: 'a' }, 'non-number index via descriptor', TypeError)
    testRejection({ i: 1.1 }, 'non-integer index via descriptor', RangeError)
    testRejection({ i: Infinity }, 'Infinity as index via descriptor', RangeError)
    testRejection({ index: -1 }, 'negative index via descriptor', RangeError)
    testRejection({ field: 'test', opts: true }, 'non-object options for localeCompare()', TypeError)
    testRejection({ sel: true }, 'non-function selector', TypeError)
    testRejection({}, 'deficient descriptor', RangeError)

    test.resolveMatch(
        [ 
            { test: 1 },
            { test: 0 }
        ]
            .toAsyncIterable()
            .sort({ field: 'test' })
            .toArray(),
        [
            { test: 0 },
            { test: 1 }
        ],
        'string field name does not reject'
    )

    const field = Symbol('test')

    test.resolveMatch(
        [ 
            { [ field ]: 1 },
            { [ field ]: 0 }
        ]
            .toAsyncIterable()
            .sort({ field })
            .toArray(),
        [
            { [ field ]: 0 },
            { [ field ]: 1 }
        ],
        'symbol field name does not reject'
    )
})
