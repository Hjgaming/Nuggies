/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
const disableDB = require('../../../models/disableSchema');
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You need the ``manage server`` permission to run this command !');

	const type = args[0];
	if(!type || !args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle('Insufficient arguments provided!').setDescription('Please provide all of these arguments: \n \n .enable (type<category/command>) (name<category/command>)').setColor('RED').setFooter('for ex: .enable command help'));
	if(type.toLowerCase() === 'command') {
		let command = args[1];
		if (client.aliases.has(command)) {
			command = client.commands.get(client.aliases.get(command)).help.name;
		}
		if(!command) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`command **${command}** not found!`).setColor('RED'));
		const check = await client.data.removedisable(message.guild.id, command, 'command');
		if(check == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Enabled!').setDescription(`**${command}** command has been enabled in **${message.guild.name}**!`).setColor('GREEN'));
		else return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Command isnt disabled!').setColor('RED'));
	}
	if(type.toLowerCase() === 'category') {
		const categoryArray = fs.readdirSync('src/commands');
		if(!categoryArray.includes(args[1].toLowerCase())) return message.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(`category **${args[1]}** not found!`));
		if(categoryArray.includes(args[1].toLowerCase())) {
			const check = await client.data.removedisable(message.guild.id, args[1].toLowerCase(), 'category');
			console.log(check);
			if(check == true) {
				const i = categoryArray.indexOf(args[1].toLowerCase());
				return message.channel.send(new Discord.MessageEmbed().setTitle('Enabled').setDescription(`**${categoryArray[i]}** category has been enabled!`).setColor('GREEN'));
			}
			else {return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('category isnt disabled!').setColor('RED'));}


		}
	}
};

module.exports.help = {
	aliases: [],
	name: 'enable',
	description: 'enable a previously disabled command',
	usage: '.enable (type)<category/command> (name)<command/category>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
};