'use strict'

module.exports = {
    isIterable,
    toAsyncIterator,
    toAsyncIterableFactory,
    toPipelineFactory: toAsyncIterableFactory
}

const { iterator, asyncIterator } = Symbol,
      AsyncIterable = require('./pipeline')

function isIterable(obj) {
    if (obj == null)
        return false
    
    return typeof obj[ iterator ] === 'function' ||
           typeof obj[ asyncIterator ] === 'function'
}

function toAsyncIterator(source) {
    return async function*() {
        source = await source

        return isIterable(source)
            ? yield* source
            : yield source
    }
}

function toAsyncIterableFactory(fn) {
    function wrapper() {
        return new AsyncIterable(fn.call(this, ...arguments))
    }

    const { name, aliases } = fn

    Object.defineProperties(wrapper, { 
        name: { value: name },
        aliases: { value: aliases } 
    })

    return wrapper
}
