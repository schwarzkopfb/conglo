'use strict'

module.exports = {
    assertType: devOnly(assertType),
    assertNumber: devOnly(assertNumber),
    assertInteger: devOnly(assertInteger),
    assertUndefined: devOnly(assertUndefined),
    assertNonNegative: devOnly(assertNonNegative),
    assertUndefinedType: devOnly(assertUndefinedType)
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

function assertType(val, type, msg, linkId) {
    if (typeof val === type)
        return

    throw error(TypeError, msg, linkId)
}

function assertNumber(val, msg, linkId) {
    assertType(val, 'number', msg, linkId)
}

function assertInteger(val, msg, linkId) {
    if (parseInt(val) === val)
        return

    throw error(RangeError, msg, linkId)
}

function assertNonNegative(val, msg, linkId) {
    if (val >= 0)
        return

    throw error(RangeError, msg, linkId)
}

function assertUndefined(val, msg, linkId) {
    if (val === undefined)
        return

    throw error(RangeError, msg, linkId)
}

function assertUndefinedType(val, msg, linkId) {
    if (typeof val === 'undefined')
        return

    throw error(TypeError, msg, linkId)
}