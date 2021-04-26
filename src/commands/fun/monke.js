/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const axios = require('axios');
module.exports.run = async (client, message, args, utils) => {
	axios.get(`https://api.monke.vip/attachments/monkey?key=${process.env.monkedev}`)
		.then(function(response) {
			const gifurl = response.data.url;
			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username}, here is your monke pic !`)
				.setFooter('🐵🐒 api by https://monkedev.com')
				.setColor('RANDOM')
				.setImage(gifurl);
			message.channel.send(embed);
		})
		.catch(function(error) {
			message.channel.send('❌**Error:** ' + error);
		});
};

module.exports.help = {
	aliases: ['monkey'],
	name: 'monke',
	description: 'Monkeeeeeeeeeeee',
	usage: config.prefix + 'monke',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Fun',
	disable: false,
	cooldown: 1000,
};