/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const guildData = await utils.findOrCreateGuild(client, { id: message.guild.id });
	const userData = await utils.findOrCreateUser(client, { id: message.author.id });

	if(userData.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	// check if the server is already premium or not
	if(guildData.premium == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already premium!').setColor('RED'));
	if(userData.tier == 1 && userData.premiumservers.length == 3 || userData.tier == 2 && userData.premiumservers.length == 5 || userData.tier == 3 && userData.premiumservers.length == 7 || userData.tier == 4 && userData.premiumservers.length == 2) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('You cannot add premium to any guilds. Please remove premium from a guild to add it!').setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setColor('RED'));
	// making the guild premium.

	guildData.premium = true;
	userData.premiumservers.push(message.guild.id);
	guildData.save();
	userData.save();

	message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium added to **${message.guild.name}**! \n \n`).setFooter('thanks for being a donor :)').setColor('GREEN'));
	client.channels.cache.get('828923022869004328').send(new Discord.MessageEmbed().setTitle(`Premium added to ${message.guild.name} [${message.guild.id}] by ${message.author.tag}`).setColor('GREEN'));
};

module.exports.help = {
	aliases: ['psadd', 'padd', 'premiumserver'],
	name: 'premiumserveradd',
	description: 'add premium to your server!',
	usage: '.psadd',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};