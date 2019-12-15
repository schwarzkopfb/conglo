'use strict'

const AsyncIterable = require('./AsyncIterable')

module.exports = toAsyncIterableFactory

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
