#!/usr/bin/env node

const shell = require('shelljs');

if (!shell.which('mplayer')) {
	shell.echo('Sorry, this script requires mplayer (sudo apt install mplayer)');
	shell.exit(1);
}

const map = require('lodash/map');
const filter = require('lodash/filter');
const isEmpty = require('lodash/isEmpty');
const first = require('lodash/first');
const spawn = require('child_process').spawn;
const stations = require('./stations.json');
const vorpal = require('vorpal')();

vorpal.delimiter('radio 2 term').show();
vorpal.command('listen [station...]', null, null)
      .autocomplete(map(stations, station => station.name))
      .action((args, cb) => {
	      let givenStation = args.station.join(' ');

	      station = first(filter(stations, (station) => station.name == givenStation));

	      isEmpty(station) ? cb(`Could not find ${givenStation}`) : startRadio(station);
      });

function startRadio(station) {
	const player = spawn('mplayer', [station.value]);

	player.stdout.pipe(process.stdout);
}

