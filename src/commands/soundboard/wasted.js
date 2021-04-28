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
		const dispatcher = connection.play(path.join(__dirname + '/audio/wasted.mp3'));
		dispatcher.on('speaking', speaking => {
			message.react('🔊').catch(err => undefined);
			if (!speaking) channel.leave();
		});
	}).catch(err => console.log(err));
};

module.exports.help = {
	aliases: [],
	name: 'wasted',
	description: 'gtav wasted sound',
	usage: '.wasted',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	disable: false,
	cooldown: 5000,
};