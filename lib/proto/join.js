'use strict'

const toArray = require('./toArray')

module.exports = join

async function join() {
    const arr = await toArray.call(this)
    return arr.join(...arguments)
}