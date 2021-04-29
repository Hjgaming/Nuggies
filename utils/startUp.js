/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const ascii = require('ascii-table');
// const DBL = require('dblapi.js');

async function startUp(client) {
	// Handlers

	// load all events - Moved to eventHandler.js

	// iya's command loader
	const tble = new ascii('Commands');
	tble.setHeading('Command', 'Load status');
	const folders = await readdir('./src/commands/');
	console.log(`Loading a total of ${folders.length} categories.`);
	folders.forEach((direct) => {
		const commandFiles = fs.readdirSync(`./src/commands/${direct}/`).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const props = require(`../src/commands/${direct}/${file}`);
			props.fileName = file;
			client.commands.set(props.help.name, props);
			client.cooldowns.set(props.help.name, new Discord.Collection());
			props.help.aliases.forEach((alias) => {
				client.aliases.set(alias, props.help.name);
			});
			tble.addRow(props.help.name, '✔');
		}
	});

	console.log(tble.toString());
	// only if you have a bot on top.gg
	// const dbl = new DBL(process.env.dbl, client);

	// Login moved to the class!
}

module.exports = startUp;