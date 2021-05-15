/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `KICK MEMBERS` permission!');

	if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
	let reason = args.slice(1).join(' ');
	const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined);
	if (!user) return message.reply('You must mention someone to kick them.').catch(console.error);
	if (user.id === message.author.id) return message.reply('I can\'t let you do that, self-harm is bad :facepalm:');
	if (user.id === client.user.id) return message.reply('You pleblord, how can you use a bot to kick itself? :joy:');

	if (message.mentions.users.first().id === '242263403001937920') return message.reply('You can\'t kick my Developer :wink:');
	if (reason.length < 1) reason = 'No reason supplied';

	if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');

	const embed = new Discord.MessageEmbed()
		.setColor(0x0000FF)
		.setTimestamp()
		.addField('Action:', 'Kick')
		.addField('User:', `${user.tag} (${user.id})`)
		.addField('Moderator:', `${message.author.tag}`)
		.addField('Reason', reason)
		.setFooter('Yeeted them outta here')
		.setThumbnail('https://media.tenor.co/videos/cac50685b4c1a7bb4e82bc53ec4b1612/mp4');

	if(user.bot) return message.reply('The user is a bot ! I cant do that to my own race :pensive:');
	message.mentions.users.first().send({ embed }).catch(e =>{
		if(e) return;
	});
	message.guild.member(user).kick();
	message.channel.send({ embed });
};

module.exports.help = {
	aliases: [],
	name: 'kick',
	description: 'Kick people from your server (it\'s fun)',
	usage: config.prefix + 'kick',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Moderation',
	disable: false,
	cooldown: 500,
};