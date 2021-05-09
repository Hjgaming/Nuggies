/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');
module.exports.run = async (client, message, args, utils) => {
	const guildData = await utils.findOrCreateGuild(client, { id: message.guild.id });
	const userData = await utils.findOrCreateUser(client, { id: message.author.id });

	if(userData.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	// check if the server is already premium or not
	if(guildData.premium == false) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('This server is already non premium!').setColor('RED'));
	if(!userData.premiumservers.includes(message.guild.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setTitle('Error').setDescription('you are not the person who made this guild premium, please contact them to remove premium.'));

	guildData.premium = true;
	const index = userData.premiumservers.indexOf(message.guild.id);
	userData.premiumservers.splice(index, 1);
	guildData.save();
	userData.save();

	message.channel.send(new Discord.MessageEmbed().setTitle('Success').setDescription(`Removed premium from **${message.guild.name}**`).setColor('GREEN'));
};

module.exports.help = {
	aliases: ['psrid', 'premove', 'pre', 'psremove'],
	name: 'premiumserverremove',
	description: 'add premium to your server!',
	usage: '.psremove',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};