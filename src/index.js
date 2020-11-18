'use strict';

const fs = require('fs');
const dot = require('dot-object');
const XLSX = require('xlsx');


function fetchFile(file) {
    return new Promise((resolve) => {
        fs.readFile(file, (error, data) => {
            resolve({
                fileName: file.substring(0, file.length - 5),
                fileFullName: file,
                fileXlsxName: file.substring(0, file.length - 4) + 'xlsx',
                fileJsonName: file.substring(0, file.length - 4) + 'json',
                fileData: data,
            });
        });
    });
}

function isFile(path) {
    return fs.lstatSync(path).isFile();
}

function getFiles(matches) {
    return matches.filter(isFile).map(fileName => fetchFile(fileName).then(file => file));
}

function toXlsx(files) {
    const filesData = getFiles(files).forEach(p => {
        p
            .then(file => {
                const jsonData = JSON.parse(file.fileData);
                const flatData = dot.dot(jsonData);
                const flatCollection = Object.keys(flatData).map(key => ({key: key, value: flatData[key]}));
                const worksheet = XLSX.utils.json_to_sheet(flatCollection);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'translations');
                XLSX.writeFile(workbook, file.fileXlsxName);
            })
            .catch((err) => {
                console.error(err.message.red);
            });
    });
}

function toJson(files) {
    const filesData = getFiles(files).forEach(p => {
        p
            .then(file => {
                const workbook = XLSX.readFile(file.fileXlsxName);
                const worksheet = workbook.Sheets['translations'];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                let flatTranslations = {};
                jsonData.forEach(t => flatTranslations[t.key] = t.value);
                const jsonTranslations = dot.object(flatTranslations);
                fs.writeFile(file.fileJsonName, JSON.stringify(jsonTranslations, null, 2), 'utf8', () => {
                    console.log('File ' + file.fileJsonName + ' saved');
                });
            })
            .catch((err) => {
                console.error(err.message.red);
            });
    });
}

module.exports = {
    toXlsx,
    toJson,
};
