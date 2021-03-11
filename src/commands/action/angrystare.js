/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to angrily stare at!');
	if (message.mentions.users.first().id == message.author.id) return message.reply('you cant lol.');
	axios.get('https://api.otakugifs.xyz/gif/angrystare', {
		headers: {
			'X-API-KEY': 'FrDrFYi5XFr7dijUh6uhMcTnc0r5MeAIrHp2waZo8FWrk3LuRzvYgbmrVW4Z04pFgzcXf2x5yxJUJ7DDslmDqb',
		},
	})
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.mentions.users.first().username} ! ${message.author.username} is staring at you angrily!`)
				.setFooter('sheesh')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: ['stareangry'],
	name: 'angrystare',
	description: 'stare at someone angrily',
	usage: config.prefix + 'stareangry',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Actions',
	disable: false,
	cooldown: 1000,
};