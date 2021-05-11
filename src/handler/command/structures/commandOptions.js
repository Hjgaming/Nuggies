const Requirements = require('./requirements');
const Help = require('./help');
const Config = require('./config');

class CommandOptions {
	constructor({
		help,
		config,
		requirements,
	}) {
		this.help = new Help(help);
		this.config = new Config(config);
		this.requirements = new Requirements(requirements);
	}
}

module.exports = CommandOptions;