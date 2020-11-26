/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args, utils) => {
	if (!message.mentions.users.first()) return message.reply('You need to mention someone to tickle them');
	if(message.mentions.users.first().id === '734006373343297557') return message.reply('You can\'t tickle him. He will explode on impact!');
	if (message.mentions.users.first().id == client.user.id) return message.channel.send('Nuuuuuuuuuuuuuuuuuuuuuu that tickless');
	const { body } = await superagent
		.get('https://nekos.life/api/v2/img/tickle');

	const embed = new Discord.MessageEmbed()
		.setColor('BLACK')
		.setTitle(`${message.mentions.users.first().username}, you got tickled by ${message.author.username}`)
		.setImage(body.url)
		.setFooter('that tickless');
	message.channel.send({ embed });
};
module.exports.help = {
	aliases: [],
	name: 'tickle',
	description: 'nein',
	usage: 'tickle',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};