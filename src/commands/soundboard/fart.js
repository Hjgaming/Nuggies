/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK'])) return message.reply('I do not have permissions to join voice channels!', { allowedMentions: { repliedUser: false } });
	const channel = message.member.voice.channel;
	if (!channel) return message.channel.send('please connect to a voice channel to use soundboard');
	if (!channel.joineable || !channel.speakable) return message.reply('I do not have permissions to join that voice channel!', { allowedMentions: { repliedUser: false } });
	channel.join().then(connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audio/fart.mp3'));
		message.react('🔊').catch(err => undefined);
		dispatcher.on('speaking', speaking => {
			if (!speaking) channel.leave();
		});
	}).catch(err => console.log(err));
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