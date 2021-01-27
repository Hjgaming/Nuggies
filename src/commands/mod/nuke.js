/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission');

	const channel = message.guild.channels.cache.get(message.channel.id);
	const position = channel.position;

	const channel2 = await channel.clone();

	channel2.setPosition(position);
	channel.delete();
	const embed = new Discord.MessageEmbed()
		.setTitle('Channel Successfully Nuked!')
		.setDescription(`The channel was nuked by ${message.author.username}`)
		.setImage('https://media1.tenor.com/images/b19fe8078c0ca25db66e20494d74fbee/tenor.gif?itemid=14282225')
		.setColor('RANDOM');
	channel2.send(embed);
};

module.exports.help = {
	aliases: ['yeetdachannel'],
	name: 'nuke',
	description: 'nuke a channel',
	usage: 'nuke',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
	disable: false,
};