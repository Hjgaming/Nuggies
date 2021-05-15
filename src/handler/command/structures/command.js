const commandoptions = require('./commandOptions');

class BaseCommand extends commandoptions {
	constructor({
		help,
		config,
		requirements,
	}) {
		super({
			help,
			config,
			requirements,
		});
	}
}
module.exports = BaseCommand;