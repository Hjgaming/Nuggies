const Requirements = require('./requirements');
const help = require('./help');
const config = require('./config');

class CommandOptions {
	constructor({
		helpC,
		configC,
		requirementsC,
	}) {
		this.help = new help(helpC);
		this.config = new config(configC);
		this.requirements = new Requirements(requirementsC);
	}
}

module.exports = CommandOptions;