/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK'])) return message.reply('I do not have permissions to join voice channels!', { allowedMentions: { repliedUser: false } });
	const channel = message.member.voice.channel;
	if (!channel) return message.channel.send('please connect to a voice channel to use soundboard');
	if (!channel.joinable || !channel.speakable) return message.reply('I do not have permissions to join that voice channel!', { allowedMentions: { repliedUser: false } });
	if (!client.soundboardqueue.get(message.guild.id)) client.soundboardqueue.set(message.guild.id, []);
	let connection;
	if (!message.guild.me.voice.channel) connection = await channel.join();
	else connection = message.guild.me.voice.connection;

	const dispatcher = connection.play(path.join(__dirname + '/audio/fart.mp3'));
	message.react('🔊').catch(err => undefined);
	client.soundboardqueue.get(message.guild.id).push(client.soundboardqueue.length + 1);
	dispatcher.on('speaking', speaking => {
		if (!speaking) {
			client.soundboardqueue.get(message.guild.id).shift();
			if (client.soundboardqueue.get(message.guild.id).length == 0) {
				channel.leave();
				client.soundboardqueue.delete(message.guild.id);
			}
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'fart',
	description: 'make a fart sound',
	usage: '.fart',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	cooldown: 2000,
	disable: false,
};