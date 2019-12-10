'use strict'

module.exports = join

async function join() {
    const arr = await this.toArray()
    return arr.join(...arguments)
}