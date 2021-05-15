const Discord = require('discord.js');
const giveaways = require('../../../functions/giveaways');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.reply('Please provide the options in the format of `{winners} {time} {prize}`');
	const hoster = message.author.id;
	const winners = parseInt(args[0]);
	const time = ms(args[1]);
	const prize = args.slice(2).join(' ');

	await giveaways.create({
		message: message, prize: prize, hoster: hoster, winners: winners, endAt: Date.now() + time,
	});

	await message.channel.send('Created a giveaway!').then(m => setTimeout(() => m.delete(), 2000));
};

module.exports.help = {
	name: 'create',
	description: '',
	aliases: [],
	usage: '',
};

module.exports.config = {
	args: false,
	category: 'giveaways',
	cooldown: 1000,
};