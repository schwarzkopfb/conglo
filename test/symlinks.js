'use strict'

const test = require('tap')

if (!require('is-ci'))
    return test.ok('symlink tests are only relevant in CI envs')

test.doesNotThrow(() => require('../without-globals'), 'require without global helpers')
test.doesNotThrow(() => require('../global/array'), 'require global helper')
test.doesNotThrow(() => require('../method/append'), 'require proto method')
