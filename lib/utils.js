'use strict'

module.exports = {
    isIterable,
    toAsyncIterator,
    toPipelineFactory,
    sameValueZero
}

const { iterator, asyncIterator } = Symbol,
      Pipeline = require('./pipeline')

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

function toPipelineFactory(fn) {
    function wrapper() {
        return new Pipeline(fn.call(this, ...arguments))
    }

    const { name, aliases } = fn

    Object.defineProperties(wrapper, { 
        name: { value: name },
        aliases: { value: aliases } 
    })

    return wrapper
}

function sameValueZero(v1, v2) {
    // NaN is the only JavaScript value that is treated as unequal to itself
    return v1 === v2 || (v1 !== v1 && v2 !== v2)
}