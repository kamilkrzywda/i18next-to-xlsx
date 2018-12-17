#!/usr/bin/env node

'use strict';

require('colors');

const yargs = require('yargs');
const glob = require('glob-promise');
const i18nextToXlsx = require('../src/index');

yargs.usage('Usage: $0 [--import]');

yargs.option('import', {
    alias: 'i',
    default: false,
    desc: 'import from xlsx to json',
});

const argv = yargs.argv;

const options = {
    nodir: true,
    dot: true,
};

if (argv['import']) {
    glob('*/*.xlsx', options)
        .then((files) => {
            console.log(`Found ${files.length} xlsx translation files`.gray);
            i18nextToXlsx.toJson(files);
        })
        .catch((err) => {
            console.error(err.message.red);
        });
} else {
    glob('*/*.json', options)
        .then((files) => {
            console.log(`Found ${files.length} json translation files`.gray);
            i18nextToXlsx.toXlsx(files);
        })
        .catch((err) => {
            console.error(err.message.red);
        });
}