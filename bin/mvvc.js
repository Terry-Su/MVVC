#!/usr/bin/env node

const program = require('commander')


program
.version('0.1.0')
.command('init [name]', 'initialize')
.command('dev [name]', 'dev')
.command('build [name]', 'build')
.parse(process.argv)
