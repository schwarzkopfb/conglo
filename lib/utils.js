'use strict'

module.exports = {
    isIterable,
    toAsyncIteratorFactory
}

const { iterator, asyncIterator } = Symbol

function isIterable(obj) {
    if (obj == null)
        return false

    return typeof obj[ iterator ] === 'function' ||
           typeof obj[ asyncIterator ] === 'function'
}

function toAsyncIteratorFactory(source) {
    return async function*() {
        source = await source

        return isIterable(source)
            ? yield* source
            : yield source
    }
}
