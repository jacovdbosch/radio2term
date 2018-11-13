const minimist = require('minimist')
const inquirer = require('inquirer')
const ConfigStore = require('configstore')
const pkg = require('../package.json')

const config = new ConfigStore(pkg.name)

let args = minimist(process.argv.slice(2));

let prompt = inquirer.createPromptModule()

let question = {
    name: 'radio',
    type: 'list',
    message: 'What radio do you want to listen to?',
    default: config.get('defaultRadio') || null,
    choices: [
        'Radio538',
        'SublimeFM',
        'SlamFM!'
    ]
}

prompt(question).then(answer => {
    config.set('defaultRadio', answer.radio)
})

