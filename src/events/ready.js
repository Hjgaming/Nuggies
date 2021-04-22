/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Discord = require('discord.js');
const automeme = require('../../models/guilds');
const config = require('../../utils/config.json');
const axios = require('axios');
module.exports = async (client) => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity('bot.nuggetdev.com/premium', { type: 'WATCHING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
	if (client.user.id !== '779741162465525790') return;
	const Webhook = new Discord.WebhookClient('834671152462430238', 'ZaUCRyZLsr3JTVliha1N-j3vw6H_SSnZVfGz0U2kws-mO7VN2Jyb0DLLFcWdhZO7QnD-');
	Webhook.send(new Discord.MessageEmbed().setTitle('Nuggies was restarted!').setDescription('Nuggies just got restarted!').setColor('e03854').setTimestamp());

	// automeme
	automeme.find({ automeme_enabled: true }, async (err, data) => {
		setInterval(() => {
			for (let i = 0; i < data.length; i++) {
				axios.get('https://api.nuggies.tech/api/meme')
					.then(function(response) {
						const embed = new Discord.MessageEmbed()
							.setTitle(`${response.data.title}`)
							.setURL(`${response.data.url}`)
							.setImage(response.data.image)
							.setColor('RANDOM')
							.setFooter(`👍 ${response.data.upvotes} 👎 ${response.data.downvotes} 💬 ${response.data.comments}`);
						client.channels.cache.get(data[i].automeme_channel).send(embed);
					});
			}
		}, 30000);
	});
};