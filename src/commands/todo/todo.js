/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const path = require('path');
const play = require('../../../functions/playstream');
module.exports.run = async (client, message, args, utils) => {
	if(args[0].toLowerCase() === 'add') {
		if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle('Please provide something to add to your todo list!').setColor('RANDOM').setFooter('use .todo list to view the list'));
		const a = await client.data.todoadd(message.author.id, args.splice(0).join());
		if(a == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Added new record to your todo list!').setFooter('use .todo list to view the list').setColor('RANDOM'));
	}
};

module.exports.help = {
	aliases: [],
	name: 'todo',
	description: 'windows xp error sound',
	usage: '.todo add/remove/list',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Todo',
	cooldown: 1000,
	disable: false,
};