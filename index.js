#!/usr/bin/env node

const shell = require('shelljs');

if (!shell.which('mplayer')) {
	shell.echo('Sorry, this script requires mplayer (sudo apt install mplayer)');
	shell.exit(1);
}

const inquirer = require('inquirer');
const ConfigStore = require('configstore');
const pkg = require('./package.json');
const spawn = require('child_process').spawn;

const config = new ConfigStore(pkg.name);

const prompt = inquirer.createPromptModule();

const question = {
	name: 'radio',
	type: 'list',
	message: 'What radio do you want to listen to?',
	default: config.get('defaultRadio') || null,
	choices: require('./src/htmlparser')()
};

prompt(question).then(function(answer) {
	const radio = answer.radio;

	config.set('defaultRadio', radio);

	const player = spawn('mplayer', [radio]);

	player.stdout.pipe(process.stdout);
});

