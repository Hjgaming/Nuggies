/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to brofist them !');
	if (message.mentions.users.first().id == message.author.id) return message.reply('you cant brofist yourself ;-;');
	axios.get('https://api.otakugifs.xyz/gif/brofist', {
		headers: {
			'X-API-KEY': 'FrDrFYi5XFr7dijUh6uhMcTnc0r5MeAIrHp2waZo8FWrk3LuRzvYgbmrVW4Z04pFgzcXf2x5yxJUJ7DDslmDqb',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.mentions.users.first().username}! You got a brofist from ${message.author.username} !`)
				.setFooter('nice bro')
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
	name: 'brofist',
	description: 'brofist someone !',
	usage: config.prefix + 'brofist',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};