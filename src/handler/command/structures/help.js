class HelpOptions {
	constructor({
		name,
		aliases = [],
		description,
		usage,
	}) {
		this.name = name;
		this.aliases = aliases;
		this.description = description;
		this.usage = usage;
	}
}
module.exports = HelpOptions;