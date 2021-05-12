/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args, utils) => {
	if(!args[1]) return message.channel.send('provide an amount bruh');
	const target = message.mentions.members.first();
	if(!target) return message.channel.send('provide a user bruh');
	// console.log(typeof (parseInt(args[1])));
	const check = await client.data.removepoints(target.id, parseInt(args[1]));
	if(check == true) return message.channel.send(new Discord.MessageEmbed().setTitle('Success').setColor('GREEN').setDescription(`removed **${parseInt(args[1])} points** from **${target.user.tag}**`));
	else return message.channel.send('there was an error bruh');
};

module.exports.help = {
	aliases: [],
	name: 'removepoints',
	description: 'remove points to a person',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	developers: true,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};