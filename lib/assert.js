'use strict'

module.exports = {
    fail,
    assertType: devOnly(assertType),
    assertObject: devOnly(assertObject),
    assertNumber: devOnly(assertNumber),
    assertInteger: devOnly(assertInteger),
    assertIntegerOrInfinity: devOnly(assertIntegerOrInfinity),
    assertFunction: devOnly(assertFunction),
    assertUndefined: devOnly(assertUndefined),
    assertNonNegative: devOnly(assertNonNegative),
    assertPositive: devOnly(assertPositive),
    assertStringOrSymbol: devOnly(assertStringOrSymbol),
    assertInstanceOf: devOnly(assertInstanceOf)
}

const links = require('./links')

function devOnly(fn) {
    return process.env.NODE_ENV === 'production'
        ? noop
        : fn
}

function noop() {}

function error(ctor, msg, linkId) {
    if (linkId) {
        const link = links[ linkId ]

        if (!link)
            fail(RangeError, 'invalid link id provided for error instantiation (framework)')

        msg += `\n    check out ${link} for more information`
    }

    const err = new ctor(msg)

    Error.captureStackTrace(err, error)

    return err
}

function fail(ctor, msg, linkId) {
    throw error(ctor, msg, linkId)
}

function assertType(val, type, msg, linkId) {
    if (typeof val !== type)
        fail(TypeError, msg, linkId)
}

function assertStringOrSymbol(val, msg, linkId) {
    switch (typeof val) {
        case 'string':
        case 'symbol':
            return
    }

    fail(TypeError, msg, linkId)
}

function assertNumber(val, msg, linkId) {
    assertType(val, 'number', msg, linkId)
}

function assertFunction(val, msg, linkId) {
    assertType(val, 'function', msg, linkId)
}

function assertObject(val, msg, linkId) {
    assertType(val, 'object', msg, linkId)
}

function assertInstanceOf(val, ctor, msg, linkId) {
    if (!(val instanceof ctor))
        fail(TypeError, msg, linkId)
}

function assertInteger(val, msg, linkId) {
    // note: also returns `false` for `Infinity`
    if (!Number.isInteger(val))
        fail(RangeError, msg, linkId)
}

function assertIntegerOrInfinity(val, msg, linkId) {
    if (!Number.isInteger(val) && val !== Infinity)
        fail(RangeError, msg, linkId)
}

function assertNonNegative(val, msg, linkId) {
    if (val < 0)
        fail(RangeError, msg, linkId)
}

function assertPositive(val, msg, linkId) {
    if (val <= 0)
        fail(RangeError, msg, linkId)
}

function assertUndefined(val, msg, linkId) {
    if (val !== undefined)
        fail(RangeError, msg, linkId)
}
