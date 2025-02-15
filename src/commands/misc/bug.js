/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const guild1 = client.guilds.cache.get('780334622164254720');
	const channel1 = guild1.channels.cache.get('783160016173531176');
	if(!args[0]) return message.channel.send('Please provide something to report');
	const suggestion = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setColor(0xff75c6)
		.setTitle('reported by ' + message.author.tag + ` [${message.author.id}]`)
		.setDescription('**' + suggestion + '**\n\n\n ')
		.setFooter('if you want to report a bug, use ' + config.prefix + 'bug <bug>');
	message.channel.send('bug report submitted. Join discord.gg/zzURhQGpRY to view your report !');
	channel1.send(embed);
	message.delete();
};


module.exports.help = {
	aliases: ['report'],
	name: 'bug',
	description: 'submit a bug report !',
	usage: config.prefix + 'bug kick command kicks the bot',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Misc',
	disable: false,
	cooldown: 0,
};