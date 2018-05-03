#!/usr/bin/env node
//
// File:	kodebuild.js
// Author:	Ivan Kluzak
// Date:	05/01/2018
// Notes:	An attempt at loading your buildspec.yml and building your project locally
//		use with Docker... I don't see why I should create one to build there and
//		then not be able to use it locally.   This attempts to bridge that gap or
//		at least kludge that gap.
// Note:
//		It's a little bit of a mess, but this is first draft.. 
//
const YAML 	= require('yamljs');
const { exec } 	= require('child_process');
const fs	= require('fs');
const chalk	= require('chalk');

const go_docker = require('./kodebuild.docker');
const go_dhelp  = require('./kodebuild.docker.help');
const go_build  = require('./kodebuild.builder');

// ------------------------------------[ usage/mode check ]-----------------------------------

var argv	= process.argv;
var CMD		= 'run_docker';

//
// Check the arguments
for (var i=1; i < process.argv.length; i++) {

        if (argv[i] === 'help') {
		CMD = 'help';
        }

	if (argv[i].match(/\.yml/)) {
		CMD = 'go_build';
	} 
}

//
// choose the command
if (CMD === 'go_build') {
	console.log(chalk.yellow("go build!"));
	go_build();					// Run through the yaml
} else if (CMD === 'help') {
	go_dhelp();					// Display help
} else {
	console.log(chalk.yellow("go docker!"));
	go_docker();					// Run the docker image
}

//eof
