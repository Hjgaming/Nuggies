/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	message.channel.send('your mom');
};


module.exports.help = {
	aliases: [],
	name: 'joke',
	description: 'Hahahaha funny joke, wanna hear one?',
	usage: config.prefix + 'joke',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Fun',
	disable: false,
	cooldown: 1000,
};