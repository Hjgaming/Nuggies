/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
const discordTTS = require('discord-tts');
const play = require('../../../functions/playstream');
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK'])) return message.reply('I do not have permissions to join voice channels!', { allowedMentions: { repliedUser: false } });
	const channel = message.member.voice.channel;
	if (!args) return message.channel.send('Please provide something to convert to TTS!');
	if (!channel) return message.channel.send('please connect to a voice channel to use TTS.');
	if (!channel.joinable || !channel.speakable) return message.reply('I do not have permissions to join that voice channel!', { allowedMentions: { repliedUser: false } });

	const broadcast = client.voice.createBroadcast();
	broadcast.play(discordTTS.getVoiceStream(`${args.join(' ')}`));
	play(message, broadcast);
	message.react('🔊').catch(err => undefined);
};

module.exports.help = {
	aliases: ['texttospeech'],
	name: 'tts',
	description: 'Convert text to speech in a voice channel!',
	usage: config.prefix + 'tts',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Soundboard',
	cooldown: 1000,
	disable: false,
};