class ConfigOptions {
	constructor({
		args,
		restricted = false,
		category,
		disable = false,
		cooldown = 1000,
		devOnly = false,
	}) {
		this.args = args;
		this.restricted = restricted;
		this.category = category;
		this.disable = disable;
		this.cooldown = cooldown;
		this.devOnly = devOnly;
	}
}
module.exports = ConfigOptions;