/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args, utils) => {
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You need the ``manage server`` permission to run this command !');
	const guildData = await utils.findOrCreateGuild(client, { id: message.guild.id });
	const type = args[0];
	if(!type || !args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle('Insufficient arguments provided!').setDescription('Please provide all of these arguments: \n \n .disable (type<category/command>) (name<category/command>)').setColor('RED').setFooter('for ex: .disable command help'));
	if(type.toLowerCase() === 'command') {
		let command = args[1];
		if (client.aliases.has(command)) {
			command = client.commands.get(client.aliases.get(command)).help.name;
		}
		if(!command) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`command **${command}** not found!`).setColor('RED'));
		guildData.commands.push(command);
		guildData.save();
		message.channel.send(new Discord.MessageEmbed().setTitle('Disabled').setDescription(`**${command}** command has been disabled in ${message.guild.name}!`).setColor('GREEN'));
	}
	if(type.toLowerCase() === 'category') {
		const categoryArray = fs.readdirSync('src/commands');
		if(!categoryArray.includes(args[1].toLowerCase())) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`category **${args[1]}** not found!`));
		if(categoryArray.includes(args[1].toLowerCase())) {
			guildData.category.push(args[1].toLowercase());
			guildData.save();
			const i = categoryArray.indexOf(args[1].toLowerCase());
			message.channel.send(new Discord.MessageEmbed().setTitle('Disabled').setDescription(`**${categoryArray[i]}** category has been disabled!`).setColor('GREEN'));

		}
	}
};

module.exports.help = {
	aliases: [],
	name: 'disable',
	description: 'disable a command',
	usage: '.disable (type)<category/command> (name)<command/category>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
};