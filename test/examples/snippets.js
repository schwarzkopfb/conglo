'use strict'

const { readFile } = require('fs').promises,
      base = require('path').join(__dirname, '..', '..', 'examples', 'snippets'),
      AsyncFunction = Object.getPrototypeOf(async function(){}).constructor,
      test = require('tap'),
      logs = process.argv.includes('-l') || process.argv.includes('--logs')

// include Conglo
require('../..')

// add/remove snippets into this list to test them
;[
    'intro'
]
    .forEach(run)

// context for snippets can be modified here
const mock = {
    User: {
        find: async () => [
            { id: 1, age: 19 },
            { id: 2, age: 21 },
            { id: 3, age: 18 },
            { id: 4, age: 49 },
            { id: 5, age: 33 },
            { id: 6, age: 42 },
        ]
    },

    fetchFromRestApi: async url => {
        const db = new Map
        db.set('/user/1/favorite-fruits', [ 'apple', 'pear' ])
        db.set('/user/2/favorite-fruits', [])
        db.set('/user/3/favorite-fruits', [ 'grape', 'orange', 'banana' ])
        db.set('/user/4/favorite-fruits', [ 'cherry', 'melon' ])
        db.set('/user/5/favorite-fruits', [ 'orange', 'blackberry', 'kiwi' ])
        db.set('/user/6/favorite-fruits', [ 'strawberry', 'peach' ])
        return db.get(url)
    },

    console: {
        log: logger(console.log),
        error: logger(console.error)
    }
}

function noop () {}

function logger(fn) {
    return logs
        ? fn
        : noop
}

async function run(name) {
    const src = await readFile(`${base}/${name}.js`),
          fn = new AsyncFunction('ctx', `with(ctx) { ${src} }`)

    test.resolves(fn(mock), name)
}