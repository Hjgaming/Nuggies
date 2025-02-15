/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n please give me `MANAGE NICKNAMES` permission !');
	let user;
	let userid;
	if (message.mentions.users.first()) {
		if (!message.member.hasPermission('MANAGE_NICKNAMES')) { return message.reply('❌**Error:** You don\'t have the permission to do that!'); }
		else {
			user = message.mentions.users.first();
			userid = message.guild.members.cache.get(user.id);
		}
		if (!userid.manageable) return message.reply('❌**Error:** I don\'t have the permission to change their nickname!');
		const nick = args.join(' ');
		if (!nick) return message.channel.send('Tell me what i should change nickname to');
		if (nick.length >= 32) return message.channel.send('Nickname must be less than 32 characters');
		userid.setNickname(nick);
		message.channel.send(Discord.Util.removeMentions(`changed ${user.username}'s nick to ${nick}`));
	}
	if (!message.mentions.users.first()) {
		if (!message.member.hasPermission('CHANGE_NICKNAME')) { return message.reply('❌**Error:** You don\'t have the permission to do that!'); }
		else {
			user = message.author;
			userid = message.guild.members.cache.get(user.id);
		}
		if (!userid.manageable) return message.reply('❌**Error:** I don\'t have the permission to change their nickname!');
		const nick = args.join(' ');
		if (!nick) return message.channel.send('Tell me what i should change nickname to');
		if (nick.length >= 32) return message.channel.send('Nickname must be less than 32 characters');
		userid.setNickname(nick);
		message.channel.send(Discord.Util.removeMentions(`changed ${user.username}'s nick to ${nick}`));
	}
};


module.exports.help = {
	aliases: ['nick'],
	name: 'nickname',
	description: 'Change your nickname',
	usage: config.prefix + 'nickname stoopid',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Misc',
	disable: false,
	cooldown: 1000,
};