'use strict'

module.exports = expose

function expose(require, exports, list) {
    for (const name of list) {
        const fn = require('./' + name)
    
        exports[ name ] = fn
    
        if (fn.aliases)
            for (const alias of fn.aliases)
                exports[ alias ] = fn
    }
}