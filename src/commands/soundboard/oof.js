/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const play = require('../../../functions/playstream');
module.exports.run = async (client, message, args, utils) => {
	if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK'])) return message.reply('I do not have permissions to join voice channels!', { allowedMentions: { repliedUser: false } });
	const channel = message.member.voice.channel;
	if (!channel) return message.channel.send('please connect to a voice channel to use soundboard');
	if (!channel.joinable || !channel.speakable) return message.reply('I do not have permissions to join that voice channel!', { allowedMentions: { repliedUser: false } });

	play(message, path.join(__dirname + '/audio/oof.mp3'));
	message.react('🔊').catch(err => undefined);
};

module.exports.help = {
	aliases: ['roblox'],
	name: 'oof',
	description: 'make an oof sound',
	usage: '.oof',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	cooldown: 1000,
	disable: false,
};