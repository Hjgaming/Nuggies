/* eslint-disable no-shadow */
const ascii = require('ascii-table');
const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
// const cmdhook = new Discord.WebhookClient(process.env.command_webhook_id, process.env.command_webhook_token);
// const errhook = new Discord.WebhookClient(process.env.err_webhook_id, process.env.err_webhook_token);
const utils = require('../../../utils/utils');

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
		this.client.on('message', (message) => this.handle(message));
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

	async handle(message) {
		if (message.author.bot || !message.guild) return;

		// Cache data
		const guildData = await this.client.findOrCreateGuild({ id: message.guild.id });
		const userData = await this.client.findOrCreateUser({ id: message.author.id });

		// Blacklist check
		if (userData.blacklisted) return;

		// AFK check - does not remove AFK but returns
		if (userData.is_afk) return;

		// Prefix
		const prefixx = !guildData.prefix ? config.prefix : guildData.prefix;
		const prefixMention = new RegExp(`^<@!?${this.client.user.id}> `);
		const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefixx;

		if (!message.content.startsWith(prefix)) return;

		// Args system
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		let command = args.shift().toLowerCase();

		// Command Handler Dynamic Checks

		if (this.client.aliases.has(command)) {
			command = this.client.commands.get(this.client.aliases.get(command)).help.name;
		}

		const commandFile = this.client.commands.get(command);
		if (!commandFile) return;
		const category = commandFile.config.category.toLowerCase();
		if (guildData.category) {
			if (guildData.category.includes(category)) return message.channel.send(new Discord.MessageEmbed().setTitle('This category is disabled.').setDescription(`category **${category}** is disabled in **${message.guild.name}**`).setColor('RED'));
		}
		if (guildData.commands) {
			if (guildData.commands.includes(command)) return message.channel.send(new Discord.MessageEmbed().setTitle('This command is disabled.').setDescription(`command **${command}** is disabled in **${message.guild.name}**`).setColor('RED'));
		}
		// if(this.client.commands.get(command).config.category === 'Actions') return message.channel.send('due to some difficulties, Actions commands are disabled for atleast a day, please join discord.gg/d98jT3mgxf for updates (we also do premium giveaways)');
		if (commandFile.config.developers) {
			if (!userData.developer) {
				return utils.errorEmbed(message, ':warning: This command is restricted only to bot owners.');
			}
		}

		if (commandFile.config.restricted) {
			if (!userData.moderator) {
				return utils.errorEmbed(message, ':warning: This command is restricted only to bot moderators / owners.');
			}
		}

		if (commandFile.config.disable) {
			return utils.errorEmbed(message, ':warning: This command is disabled for a short period of time! :warning:');
		}

		if (commandFile.config.args) {
			if (!args[0]) {
				return utils.errorEmbed(message, `Invalid arguments. Use: ${prefix + 'help ' + this.client.commands.get(command).help.name}`);
			}
		}

		// Core Command Handler and Cooldown Checks

		const cooldown = this.client.commands.get(command).config.cooldown;
		const pcooldown = this.client.commands.get(command).config.cooldown / 2;

		const timestamps = this.client.cooldowns.get(command);
		if (timestamps.has(message.author.id)) {
			if (data.user.premium == true) {
				const expirationTime = timestamps.get(message.author.id) + pcooldown;
				if (Date.now() < expirationTime) {
					const timeLeft = utils.timer(expirationTime);
					return message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}, ⏰ Hold up!`).setDescription(`This command is on cooldown for **${timeLeft}** \n \n the default cooldown for this command is **\`${utils.timer(cooldown + Date.now())}\`** but since you are a [donator](https://bot.nuggetdev.com/premium), you only need to wait for **\`${utils.timer(pcooldown + Date.now())}!\`**`).setColor('RED'));
				}
			}
			else {
				const expirationTime = timestamps.get(message.author.id) + cooldown;
				if (Date.now() < expirationTime) {
					const timeLeft = utils.timer(expirationTime);
					return message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}, ⏰ Hold up!`).setDescription(`This command is on cooldown for **${timeLeft}** \n \n the default cooldown for this command is **\`${utils.timer(cooldown + Date.now())}\`** but for [__**donators**__](https://bot.nuggetdev.com/premium), its only **\`${utils.timer(pcooldown + Date.now())}\` !**`).setColor('RED'));
				}
			}
		}

		// Command Logs

		try {
			if (this.client.user.id === '779741162465525790') {
				if (!command) return;
				// const m = new Discord.MessageEmbed().setTitle(`Command used in ${message.guild.name}`).setColor('RANDOM').addField('User:', `${message.author.tag}`).addField('User ID:', `${message.author.id}`).addField('Command:', `${command}`).addField('Message Content:', `${message.content}`).addField('Guild ID:', `${message.guild.id}`);
				// await cmdhook.send(m);
			}
			await timestamps.set(message.author.id, Date.now());
			setTimeout(
				async () => await timestamps.delete(message.author.id), cooldown);
			await commandFile.run(this.client, message, args, utils);
		}
		catch (error) {
			// Command Errors
			if (this.client.user.id === '779741162465525790') {
				// const errEmbed = new Discord.MessageEmbed().setTitle(`Command error in ${message.guild.name}`).addField('Additional Details', `**Guild ID :** ${message.guild.id}\n**Author :** ${message.author.tag}(${message.author.id})\n**Command :** ${commandFile.help.name}\n**Content :** ${message.content}`, false).setDescription(`**Error:**\n\`\`\`js\n${error}\n\`\`\``).setTimestamp();
				// errhook.send(errEmbed);
			}
			console.log(error);
			return message.channel.send(new Discord.MessageEmbed().setTitle('Something went wrong!').setDescription('please report it in our [support server](https://discord.gg/ut7PxgNdef)').setColor('RED'));
		}
	}
}
module.exports = CommandHandler;