/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message, args, utils, data) => {
	if(!args) return message.channel.send('a');
	const type = args[0];
	if(type === 'command') {
		let command = args[1];
		if (client.aliases.has(command)) {
			command = client.commands.get(client.aliases.get(command)).help.name;
		}
		if(!command) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`command **${command}** not found!`).setColor('RED'));
		client.data.adddisable(message.guild.id, command, 'command');
		message.channel.send(new Discord.MessageEmbed().setTitle('Disabled').setDescription(`${command} command has been disabled!`).setColor('GREEN'));
	}
	if(type === 'category') {
		const categoryArray = fs.readdirSync('src/commands');
		if(!categoryArray.includes(args[1].toLowerCase())) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`category **${args[1]}** not found!`));
		if(categoryArray.includes(args[1].toLowerCase())) {
			client.data.adddisable(message.guild.id, args[1].toLowerCase(), 'category');
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