'use strict';

const sequence = require('sequence-as-promise');
const fs = require('fs');

function fetchFile(file) {
    return new Promise((resolve) => {
        fs.readFile(file, (error, data) => {
            const jsonData = JSON.parse(data);
            resolve({
                fileName: file,
                fileData: jsonData,
            });
        });
    });
}

function isFile(path) {
    return fs.lstatSync(path).isFile();
}

function exportTranslations(matches, resolve = (args) => args) {
    const files = matches.filter(isFile);
    return sequence(files.map((file) => () => fetchFile(file)
        .then(() => {
            return resolve();
        })
    ));
}

function importTranslations(matches, resolve = (args) => args) {
    const files = matches.filter(isFile);
    return sequence(files.map((file) => () => fetchFile(file)
        .then(() => {
            return resolve();
        })
    ));
}

module.exports = {
    export: exportTranslations,
    import: importTranslations,
};
