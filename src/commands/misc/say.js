/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const saymessage = args.join(' ');
	if(!saymessage) return message.channel.send('Please provide something for me to say!');
	message.delete().catch(err => console.log(err));
	message.channel.send('**' + Discord.Util.escapeMarkdown(saymessage) + '**\n\n_ _   - ' + message.author.username, { allowedMentions: { parse: [], users: [], roles: [] } });
};


module.exports.help = {
	aliases: ['echo'],
	name: 'say',
	description: 'Make me say something',
	usage: config.prefix + 'say',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Misc',
	disable: false,
	cooldown: 5000,
};