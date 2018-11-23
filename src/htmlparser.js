const fs = require('fs');
const cheerio = require('cheerio');

module.exports = function() {
	const content = fs.readFileSync(__dirname + '/streaming.html', 'utf8');

	const $ = cheerio.load(content);

	let table = $('#container > table:nth-child(6) > tbody:nth-child(1) > tr > td:nth-child(1) > a:nth-child(1)');

	let radios = [];

	table.each(node => {
		let a = $(table[node]);

		let name = a.text().replace('— ', '').replace('* ', '').replace('• ', '');
		let value = a.attr('href');

		if (name != null && value !== null) {
			radios.push({name, value});
		}
	});

	return radios;
};
