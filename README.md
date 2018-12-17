# encoding-checker

[![npm version](https://badge.fury.io/js/encoding-checker.svg)](https://badge.fury.io/js/encoding-checker)
[![downloads count](https://img.shields.io/npm/dt/encoding-checker.svg)](https://www.npmjs.com/~piecioshka)
[![travis](https://img.shields.io/travis/piecioshka/encoding-checker.svg?maxAge=2592000)](https://travis-ci.org/piecioshka/encoding-checker)
[![dependencies](https://david-dm.org/piecioshka/encoding-checker.svg)](https://github.com/piecioshka/encoding-checker)
[![coveralls](https://coveralls.io/repos/github/piecioshka/encoding-checker/badge.svg?branch=master)](https://coveralls.io/github/piecioshka/encoding-checker?branch=master)

:hammer: Tool to investigate files with different encoding than passed

## Install

```bash
npm install -g encoding-checker
```

## Usage

```text
Usage: encoding-checker [-p pattern] [-i encoding] [-v]

Options:
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
  --pattern, -p, -d                                               [default: "*"]
  --ignore-encoding, -i                                            [default: ""]
  --verbose, -v                                                 [default: false]
```

## Examples

### :arrow_right: Use case: `All files in current directory`

```bash
> encoding-checker

[ascii] .gitignore
[ascii] .travis.yml
[ascii] index.js
[ascii] package-lock.json
[ascii] package.json
[ascii] README.md
[ascii] wallaby.js
```

### :arrow_right: Use case: `All *.md files in current directory`

```bash
encoding-checker -p "*.md"
```

### :arrow_right: Use case: `Ignore all files with encoding "ascii"`

```bash
encoding-checker -i "ascii"
```

### :arrow_right: Use case: `Append number of results`

```bash
encoding-checker -v
```

## Supported Operating Systems (tested via Travis)

* Linux
* macOS
* Microsoft Windows

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2015-2018
