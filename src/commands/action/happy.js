/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	axios.get('https://api.otakugifs.xyz/gif/happy', {
		headers: {
			'X-API-KEY': 'oUIyhMl1SNDIlYVxbhGYqznXgvJtLkWQsg05AzQ2dSh7yQVfnMEJA25Bs89VnJxM1G0hUUrNgc4B2vlP8LvrNq',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username} is happy ! 😀`)
				.setFooter('happiness noizes')
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
	name: 'happy',
	description: 'happy',
	usage: config.prefix + 'happy',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'moderation',
	disable: false,
	cooldown: 1000,
};