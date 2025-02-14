/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const user = require('../../../models/users');

module.exports.run = async (client, message, args, utils) => {
	const target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));

	const superMods = ['555064829946232832', '833713876628406363', '460078206326800434'];
	if(!superMods.includes(message.author.id)) {
		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(':warning: Failed')
				.setDescription(
					'You do not have enough privileges to execute this command',
				)
				.setColor('RED'),
		);
	}

	if(!target) return message.channel.send('You did not mention a user to grant privileges to.');

	const checkTarget = message.guild.members.cache.get(`${target.id}`);
	if (!checkTarget) {
		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(':warning: Error')
				.setDescription(
					`${target} is not a valid user. Not even sure what you're on about`,
				)
				.setColor('RED'),
		);
	}

	const fetch = await utils.findOrCreateUser(client, { id: target.id });
	fetch.developer = false;
	fetch.save();

	if (fetch.developer) {
		await client.data.developer(target.id, 'false');
		message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('<a:9689_tick:785181267758809120> Success!')
				.setDescription(
					`Successfully revoked **<@${target.id}>'s** developer permissions`,
				)
				.setColor('RED'),
		);
		message.guild.members.cache
			.get(target.id)
			.send(
				new Discord.MessageEmbed()
					.setTitle(':warning: Alert')
					.setDescription(
						`Your developer permissions for **Nuggies** were revoked by **${message.author.tag}**`,
					)
					.setColor('RED'),
			);
	}
	else {
		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(':warning: Error')
				.setDescription('This user doesn\'t have developer permissions')
				.setColor('RED'),
		);
	}

};

module.exports.help = {
	aliases: ['r-d'],
	name: 'remove-dev',
	description: 'Remove a developer from the permissions array',
	usage: config.prefix + 'remove-dev <id>',
};

module.exports.config = {
	category: 'Owner',
	developers: true,
	disable: false,
	cooldown: 2000,

};
