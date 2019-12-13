'use strict'

const { 
          fail,
          assertObject,
          assertNumber, 
          assertInteger, 
          assertNonNegative,
          assertFunction,
          assertUndefined,
          assertStringOrSymbol
      } = require('../assert'),
      { toPipelineFactory } = require('../utils')

sort.aliases = [ 'sortBy', 'order', 'orderBy' ]
module.exports = toPipelineFactory(sort)

async function* sort(...rules) {
    const arr = await this.toArray()

    yield* arr.sort(
        rules.length > 0
            ? compose(rules)
            : defaultComparer
    )
}

function reverse(fn) {
    return (a, b) => -fn(a, b)
}

function defaultComparer(a, b, opts = { numeric: true }) {
    return a !== undefined && a !== null
        // support accented letters, etc.
        ? a.toString().localeCompare(b, opts.locales, opts)
        : 0
}

function comparerFromOptions(opts) {
    return (a, b) => defaultComparer(a, b, opts)
}

function comparerFromFieldNameOrIndex(name, opts) {
    return (a, b) => defaultComparer(a[ name ], b[ name ], opts)
}

function comparerFromSelector(fn, opts) {
    return (a, b) => defaultComparer(fn(a), fn(b), opts)
}

function comparerFromDescriptor({ 
    d, desc, descending,
    c, comp, comparer,
    o, opts, options,
    s, sel, selector,
    f, field,
    i, index
}) {
    d = d || desc || descending
    c = c || comp || comparer
    o = o || opts || options
    s = s || sel || selector
    f = f || field

    // `0` is a reasonable value for index but
    // `i || index === undefined` when `i === 0`
    if (i === undefined)
        i = index

    if (o !== undefined)
        assertObject(o, 'when provided, options for localeCompare() must be an object')

    // custom comparer function provided
    if (c !== undefined) {
        assertFunction(c, 'when provided, comparer must be a function')
        assertUndefined(s, 'comparer cannot be provided together with a selector')
        assertUndefined(f, 'comparer cannot be provided together with a field name')
        assertUndefined(i, 'comparer cannot be provided together with an index')
        assertUndefined(d, 'ordering direction cannot be specified when a comparer is provided')
        assertUndefined(o, 'ordering options cannot be specified when a comparer is provided')

        return c
    }
    // custom selector function provided
    else if (s !== undefined) {
        assertUndefined(f, 'selector cannot be provided together with a field name')
        assertUndefined(i, 'selector cannot be provided together with an index')
        assertFunction(s, 'when provided, selector must be a function')

        c = comparerFromSelector(s, o)

        return d
            ? reverse(c)
            : c
    }
    // field name provided
    else if (f !== undefined) {
        assertUndefined(i, 'field name cannot be provided together with an index')
        assertStringOrSymbol(f, 'field name must be either a string or a symbol')

        c = comparerFromFieldNameOrIndex(f, o)

        return d
            ? reverse(c)
            : c
    }
    // array index provided
    else if (i !== undefined) {
        assertNumber(i, 'when provided, index must be a number')
        assertInteger(i, 'index must be an integer', 'sort_non_int_neg')
        assertNonNegative(i, 'index must be greater than or equal to zero', 'sort_non_int_neg')

        c = comparerFromFieldNameOrIndex(i, o)

        return d
            ? reverse(c)
            : c
    }
    // only localeCompare() options (and maybe ordering direction) are provided
    // e.g. `{ opts: { locales: 'fr' } }` or `{ opts: { ignorePunctuation: true }, desc: true }`
    // use default comparer with given options
    else if (o !== undefined) {
        c = comparerFromOptions(o)

        return d
            ? reverse(c)
            : c
    }
    // only sorting order is specified, e.g. `{ desc: true }`
    // use default comparer, but descending order
    else if (d !== undefined)
        return reverse(defaultComparer)
    else
        fail(RangeError, 'the provided sorting descriptor is deficient')
}

// create comparer function from the given ordering rules
// the resulting function is suitable for Array's sort() method,
// and performs as many subsequent orderings as needed
function compose(rules) {
    const fns = []
    let fn

    for (const rule of rules) {
        switch (typeof rule) {
            // selector passed directly -> ascending by default
            case 'function':
                fn = comparerFromSelector(rule)
                break

            // array index passed directly -> ascending by default
            case 'number':
                assertInteger(rule, 'index must be an integer', 'sort_non_int_neg')
                assertNonNegative(rule, 'index must be greater than or equal to zero', 'sort_non_int_neg')
            
            // field name passed directly -> ascending by default
            case 'string':
            case 'symbol':
                fn = comparerFromFieldNameOrIndex(rule)
                break

            // rule is an object containing ordering options
            case 'object':
                // `typeof null === 'object'`
                if (rule !== null) {
                    fn = comparerFromDescriptor(rule)
                    break
                }

            default:
                fail(TypeError, 'invalid sorting descriptor provided')
        }

        fns.push(fn)
    }

    return (a, b) => {
        let result

        for (const fn of fns) {
            result = fn(a, b)
            if (result !== 0) break
        }

        return result
    }
}