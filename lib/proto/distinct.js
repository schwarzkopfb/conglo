'use strict'

distinct.chainable = true
distinct.aliases = [ 'dedup', 'deduplicate', 'unique' ]
module.exports = distinct

async function* distinct() {
    const seen = new Set

    for await (const item of this) {
        if (seen.has(item)) 
            continue

        seen.add(item)
        yield item
    }
}