const Discord = require('discord.js');
const giveaways = require('../../../functions/giveaways');

module.exports.run = async (client, message, args) => {
	const gws = await giveaways.getByGuildID(message.guild.id);
	if (!gws) return message.channel.send('There are no giveaways in this server!');

	const embed = new Discord.MessageEmbed()
		.setTitle(`Giveaways in ${message.guild.name}!`)
		.setDescription(`${gws.map(async (x, i) =>
			`\`${i}.\` Prize: **${x.prize}** - Hosted By: ${message.guild.members.cache.get(x.hoster) || await message.guild.members.fetch(x.hoster).catch() || client.users.cache.get(x.hoster) || `<@!${x.hoster}>`}\nChannel: <#${x.channelID}> - Winners: ${x.winners}`,
		).join('\n')}`);
	message.channel.send(embed);
};

module.exports.help = {
	name: 'list',
	description: '',
	aliases: [],
	usage: '',
};

module.exports.config = {
	args: false,
	category: 'giveaways',
	cooldown: 1000,
};