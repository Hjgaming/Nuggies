const Discord = require('discord.js');
const giveaways = require('../../../functions/giveaways');

module.exports.run = async (client, message, args) => {
	let gws = await giveaways.getByGuildID(message.guild.id);
	if (!gws) return message.channel.send('There are no giveaways in this server!');
	gws = gws.filter(x => x.ended !== true);
	if (!gws[0]) return message.channel.send('There are no running giveaways in this server!');

	const embed = new Discord.MessageEmbed()
		.setTitle(`Giveaways in ${message.guild.name}!`)
		.setDescription(`${gws.filter(gw => !gw.ended).map((x, i) =>
			`\`${i}.\` Prize: **${x.prize}** - Hosted By: ${message.guild.members.cache.get(x.hoster) || client.users.cache.get(x.hoster) || `<@!${x.hoster}>`}\nChannel: <#${x.channelID}> - Winners: ${x.winners}`,
		).join('\n\n')}`)
		.setColor('RANDOM')
		.setFooter(message.author.tag, message.author.displayAvatarURL());
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