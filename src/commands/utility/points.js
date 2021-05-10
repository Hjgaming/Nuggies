/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const target = message.mentions.members.first() || message.member;
	try {
		const a = await client.data.returnpoints(target.id);
        message.channel.send(new Discord.MessageEmbed().setTitle(`${target.user.username}'s afk stats`).setDescription(`points: ${a.points}`).setColor('RANDOM').setThumbnail(target.user.avatarURL({ dynamic: true })));
		// message.channel.send(new Discord.MessageEmbed().setTitle(a));
	}
	catch (e) {return message.channel.send(e);}
};

module.exports.help = {
	aliases: [],
	name: 'points',
	description: 'check your points',
	usage: '.points',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};