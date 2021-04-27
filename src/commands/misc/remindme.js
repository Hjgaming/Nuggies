/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const ms = require('ms');

module.exports.run = async (client, message, args, utils) => {
	if (args[0].toLowerCase() === 'add') {
		if (!args[1]) return message.reply('Provide me time bro', { allowedMentions: { parse: [], users: [], roles: [], repliedUser: false } });
		if (!ms(args[1])) return message.reply('Provide valid time bro, should be like `10s`', { allowedMentions: { parse: [], users: [], roles: [], repliedUser: false } });
		if (ms(args[0]) <= 5) return message.reply('Just remember it yourself bro', { allowedMentions: { parse: [], users: [], roles: [], repliedUser: false } });
		if(ms(args[1]) > 1209600000) return message.reply(`You have exceeded the maximum amount of time of ${ms(1209600000, { long: true })}!`);
		const time = Date.now();
		client.reminders.set(client.reminders.size + 1, {
			author: message.author.id,
			reason: args.slice(2).join(' '),
			function: setTimeout(() => {
				const remindEmbed = new Discord.MessageEmbed()
					.setTitle('Reminder!')
					.setDescription(`${ms(Date.now() - time, { long: true })} ago, You asked me to remind you to \`${args.slice(2).join(' ')}\`!\nID: ${client.reminders.size}`)
					.setColor('RANDOM')
					.setTimestamp()
					.setAuthor(message.author.tag, message.author.displayAvatarURL());
				message.author.send({ embed: remindEmbed });
				client.reminders.delete(client.reminders.size + 1);
			}, ms(args[1])),
		});
		message.reply(`Alright I'll remind you \`${args.slice(2).join(' ')}\` after ${(args[1])} \`ID: ${client.reminders.size}\`! Make sure your DMs are open :wink:`, { allowedMentions: { parse: [], users: [], roles: [] } });
	}
	else if (args[0].toLowerCase() === 'list') {
		if (!client.reminders.find(x => x.author === message.author.id)) return message.reply('You haven\'t created any reminders!', { allowedMentions: { repliedUser: false } });
		const embed = new Discord.MessageEmbed()
			.setTitle(`${message.author.username}'s reminders`)
			.setDescription(`You have a total of ${client.reminders.filter(y => y.author === message.author.id).size} reminders!\n\n${client.reminders.filter(reminder => reminder.author === message.author.id).map(r => `\`ID:\` **${client.reminders.findKey(k => k === r)}** \`Reason:\` **${r.reason}**`).join('\n')}`)
			.setColor('RANDOM');
		message.channel.send(embed);
	}
	else if (args[0].toLowerCase() === 'delete') {
		if (parseInt(args[1]) <= 0) return message.reply('Please provide a valid ID!', { allowedMentions: { repliedUser: false } });
		if (!client.reminders.find(x => x.author === message.author.id)) return message.reply('You haven\'t created any reminders!', { allowedMentions: { repliedUser: false } });
		if (isNaN(args[1]) || parseInt(args[0]) > client.reminders.size) return message.reply('That is not a valid ID!', { allowedMentions: { repliedUser: false } });
		if (client.reminders.get(parseInt(args[1])).author !== message.author.id) return message.reply('That is not your reminder! You can only delete your own reminders.', { allowedMentions: { repliedUser: false } });
		const deleted = client.reminders.get(parseInt(args[1]));
		client.reminders.delete(parseInt(args[1]));
		message.channel.send(`Deleted reminder with ID ${args[1]} and reason \`${deleted.reason}\``, { allowedMentions: { repliedUser: false, users: [], roles: [], parse: [] } });
	}
	else {
		message.reply('You can use `add` to add a reminder, `delete` to delete any existing reminders and `list` to view all of your reminders!', { allowedMentions: { repliedUser: false } });
	}
};

module.exports.help = {
	aliases: ['timer'],
	name: 'remindme',
	description: 'Think you\'ll forget the thing your mom told you to do? Just set a reminder',
	usage: config.prefix + 'remindme add 1h I gotta dance',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Misc',
	disable: false,
	cooldown: 1000,
};