'use strict'

// create symbolic links for prettier require paths
// e.g. require('conglo/lib/without-globals') -> require('conglo/without-globals')

const { symlinkSync } = require('fs')

const folderType = process.platform === 'win32'
    ? 'junction'
    : 'dir'

symlinkSync('./lib/without-globals.js', './without-globals.js')
symlinkSync('./lib/global', './global', folderType)
symlinkSync('./lib/proto', './method', folderType)
