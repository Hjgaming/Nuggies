/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const urban = require('urban');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	try {
		const saymessage = args.join(' ');
		const trollface = urban(saymessage);
		trollface.first(async function(json) {
			if(!json) return message.channel.send('Word not found');
			const m = new Discord.MessageEmbed()
				.setTitle(`Definition for ${saymessage}`)
				.setDescription('**' + saymessage + '**: ' + json.definition + '\n\n' + json.example + '\n Go to ' + json.permalink + ' for more information')
				.setColor('RANDOM');
			message.channel.send(m);
		});
	}
	catch (error) { message.channel.send('Word not found'); }
};

module.exports.help = {
	aliases: [],
	name: 'define',
	description: 'Don\'t know meaning of a word? We got you covered',
	usage: config.prefix + 'define ass',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Misc',
	disable: false,
	cooldown: 2000,
};
