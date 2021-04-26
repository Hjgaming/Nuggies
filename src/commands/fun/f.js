/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils, data) => {
	message.delete();
	message.channel.send('f');
};

module.exports.help = {
	aliases: [],
	name: 'f',
	description: 'f',
	usage: config.prefix + 'f',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 69,
};