'use strict'

module.exports = {
    fail,
    assertType: devOnly(assertType),
    assertObject: devOnly(assertObject),
    assertNumber: devOnly(assertNumber),
    assertInteger: devOnly(assertInteger),
    assertFunction: devOnly(assertFunction),
    assertUndefined: devOnly(assertUndefined),
    assertNonNegative: devOnly(assertNonNegative),
    assertStringOrSymbol: devOnly(assertStringOrSymbol),
}

const links = require('./links')

function devOnly(fn) {
    return process.env.NODE_ENV === 'production'
        ? noop
        : fn
}

function noop() {}

function error(ctor, msg, linkId) {
    if (linkId)
        msg += `\n    check out ${links[ linkId ]} for more information`

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

function assertInteger(val, msg, linkId) {
    if (parseInt(val) !== val)
        fail(RangeError, msg, linkId)
}

function assertNonNegative(val, msg, linkId) {
    if (val < 0)
        fail(RangeError, msg, linkId)
}

function assertUndefined(val, msg, linkId) {
    if (val !== undefined)
        fail(RangeError, msg, linkId)
}
