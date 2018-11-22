#!/usr/bin/env node

var shell = require('shelljs')

if (!shell.which('mplayer')) {
    shell.echo('Sorry, this script requires mplayer (sudo apt install mplayer)')
    shell.exit(1)
}

var inquirer = require('inquirer')
var ConfigStore = require('configstore')
var pkg = require('./package.json')
var spawn = require('child_process').spawn

var config = new ConfigStore(pkg.name)

var prompt = inquirer.createPromptModule()

var question = {
    name: 'radio',
    type: 'list',
    message: 'What radio do you want to listen to?',
    default: config.get('defaultRadio') || null,
    choices: [
        {name: '538', value: 'http://18973.live.streamtheworld.com/RADIO538.mp3'},
        {name: '538 Dance Department', value: 'http://playerservices.streamtheworld.com/api/livestream-redirect/TLPSTR01'},
        {name: 'SublimeFM', value: 'http://Stream.sublimefm.nl/SublimeFM_mp3'},
        {name: 'SlamFM!', value: 'http://18403.live.streamtheworld.com/SLAM_MP3_SC'},
        {name: 'Sky Radio', value: 'http://playerservices.streamtheworld.com/api/livestream-redirect/SKYRADIO.mp3'},
    ],
}

prompt(question).then(function (answer) {
    var radio = answer.radio

    config.set('defaultRadio', radio)

    var player = spawn('mplayer', [radio])

    player.stdout.pipe(process.stdout)
})

