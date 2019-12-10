'use strict'

const { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(inspect)

async function* inspect(labelOrFn, self) {
    if (typeof labelOrFn === 'function') {
        let i = 0
        for await (const item of this) {
            await labelOrFn.call(self, item, i++)
            yield item
        }
    }
    else {
        const args = []

        if (arguments.length > 0)
            args.push(labelOrFn)

        const arr = await this.toArray()
        args.push(arr)

        console.log(...args)

        yield* arr
    }
}