# Gendiff

[![Actions Status](https://github.com/komAr971/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/komAr971/frontend-project-lvl2/actions)
[![tests-lint](https://github.com/komAr971/frontend-project-lvl2/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/komAr971/frontend-project-lvl2/actions/workflows/main.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/e436951846d81f25ef6f/maintainability)](https://codeclimate.com/github/komAr971/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e436951846d81f25ef6f/test_coverage)](https://codeclimate.com/github/komAr971/frontend-project-lvl2/test_coverage)

Small library for compares two configuration files and shows a difference.

### Usage: 

```bash
$ gendiff [options] <filepath1> <filepath2>
```
or
```js
import gendiff from 'gendiff';
```

#### Options:
 * ***-V***, ***--version*** output the version number
 * ***-f***, ***--format*** <type> output format (default: "stylish")
 * ***-h***, ***--help*** display help for command

### Install

```bash
$ git clone git@github.com:komAr971/gendiff.git
$ cd gendiff
$ make install
$ make link
```

##### Demo

[![asciicast](https://asciinema.org/a/23bAbCKwJWryHIEwDjxl0zefM.svg)](https://asciinema.org/a/23bAbCKwJWryHIEwDjxl0zefM)

### Test

```bash
$ make test
```

### Lint

```bash
$ make lint
```
