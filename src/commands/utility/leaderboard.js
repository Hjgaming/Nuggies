/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const lb = await client.data.pointsleaderboard();
	lb.forEach(e => client.users.fetch(e.id));
	const mappedlb = lb.map(i => `${client.users.cache.get(i.id).tag ? client.users.cache.get(i.id).tag : 'Unknown'} - ${i.points}`);
	message.channel.send(new Discord.MessageEmbed().setTitle('a').setDescription(mappedlb.join('\n')));
};

module.exports.help = {
	aliases: [],
	name: 'leaderboard',
	description: 'check the leaderboard',
	usage: '.leaderboard',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};