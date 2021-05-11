/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const user = require('../../../models/users');

module.exports.run = async (client, message, args) => {
	const target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));
	const superMods = ['555064829946232832', '833713876628406363', '460078206326800434'];
	if(!superMods.includes(message.author.id)) {
		return message.channel.send(new Discord.MessageEmbed().setTitle(':warning: Failed').setDescription('You do not have enough privileges to execute this command').setColor('RED'));
	}
	if(!target) return message.channel.send('You did not mention a user to grant privileges to.');

	const checkTarget = message.guild.members.cache.get(`${target.id}`);
	if (!checkTarget) {
		return message.channel.send(new Discord.MessageEmbed().setTitle(':warning: Error').setDescription(`${target} is not a valid user. Not even sure what you're on about`).setColor('RED'),
		);
	}

	const fetch = await utils.findOrCreateUser(client, { id: target.id });
	if (fetch.developer) {
		return message.channel.send(new Discord.MessageEmbed().setTitle(':warning: Error').setDescription('This user already has developer permissions').setColor('RED'),
		);
	}
	else {
		fetch.developer = true;
		fetch.save();

		message.channel.send(new Discord.MessageEmbed().setTitle('<a:9689_tick:785181267758809120> Success!').setDescription(`**<@${target.id}>** was successfully given developer permissions`).setColor('GREEN'));
		message.guild.members.cache.get(target.id).send(new Discord.MessageEmbed().setTitle(':warning: Alert').setDescription(`You were granted developer permissions by **${message.author.tag}** for **Nuggies**`).setColor('GREEN'));
	}
};

module.exports.help = {
	aliases: ['a-d'],
	name: 'add-dev',
	description: 'Add a developer to the permissions array',
	usage: config.prefix + 'add-dev <id>',
};

module.exports.config = {
	developers: true,
	category: 'Owner',
	disable: false,
	cooldown: 2000,
};
