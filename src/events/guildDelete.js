const Discord = require('discord.js');

module.exports = async (client, guild) => {
	if(guild.name == 'undefined') return;
	const guildData = await utils.findOrCreateGuild(client, { id: guild.id });
	guildData.deleteOne({ id: guild.id });
	guildData.save();
	const channel = await client.channels.cache.get('783160231734673408');
	const m = new Discord.MessageEmbed()
		.setTitle(`just left ${guild.name}`)
		.setFooter(`Total servers : ${client.guilds.cache.size} | Members : ${guild.memberCount}`)
		.setColor('RED');
	channel.send(m);
};