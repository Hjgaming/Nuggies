/* eslint-disable no-shadow */
const ascii = require('ascii-table');
const fs = require('fs');
const Discord = require('discord.js');

class CommandHandler {

	/**
	 *
	 * @param {Discord.Client} client
	 * @param {String} prefix
	 */

	constructor(client, { prefix }) {
		this.client = client;
		this.prefix = prefix;

		this.tble = new ascii('Commands');
		this.tble.setHeading('Command', 'Load status');
		const folders = fs.readdirSync('./src/commands/');
		console.log(`Loading a total of ${folders.length} categories.`);
		folders.forEach((direct) => {
			const commandFiles = fs.readdirSync(`./src/commands/${direct}/`).filter((file) => file.endsWith('.js'));

			for (const file of commandFiles) {
				this.load(file, direct);
			}
		});

		console.log(this.tble.toString());
	}

	async load(file, direct) {
		const props = require(`../../commands/${direct}/${file}`);
		props.fileName = file;
		this.client.commands.set(props.help.name, props);
		this.client.cooldowns.set(props.help.name, new Discord.Collection());
		props.help.aliases.forEach((alias) => {
			this.client.aliases.set(alias, props.help.name);
		});
		this.tble.addRow(props.help.name, '✔');
	}
}
module.exports = CommandHandler;