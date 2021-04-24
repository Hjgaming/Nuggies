/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const e = client.channels.cache.get('833590320788406322');
	if(!args[0]) return message.channel.send('Please provide something to suggest !');
	const suggestion = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setColor('#2c2f33')
		.setTitle('Suggestion from ' + message.author.tag + ` [${message.author.id}]`)
		.setDescription(suggestion)
		.setFooter('if you want to suggest something, use ' + config.prefix + 'suggest <suggestion>');
	message.channel.send('suggestion submitted. Join discord.gg/zzURhQGpRY to upvote your suggestion !');
	e.send(embed).then(m => {
		m.react('👍');
		m.react('👎');
	});
};


module.exports.help = {
	aliases: [],
	name: 'suggest',
	description: 'suggest something for the bot !',
	usage: config.prefix + 'suggest Make chat less dead',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'More',
	cooldown: 0,
};