/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	axios.get('https://api.otakugifs.xyz/gif/dance', {
		headers: {
			'X-API-KEY': process.env.otakugifs,
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username} is dancing ! 💃🕺💃🕺`)
				.setFooter('move 😍 that 😀 sexy 🤪 body 😳')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: [],
	name: 'dance',
	description: 'dance !',
	usage: config.prefix + 'dance',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};