#!/usr/bin/env node

const minimist = require('minimist');
const startServer = require('../lib');

const args = minimist(process.argv.slice(2));

const configFile = args._[0];
const hasStatusRoute = args.s;

startServer(require(configFile), hasStatusRoute);
