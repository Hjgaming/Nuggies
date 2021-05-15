/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {

	const guildData = await utils.findOrCreateGuild(client, { id: message.guild.id });

	const muteRole = message.mentions.roles.first();

	const errEmbed = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setAuthor('Error executing the command')
		.setDescription('Please mention a valid role or role ID');
	const perms = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setAuthor('Error executing the command')
		.setDescription('You need the ``Manage Server`` permission to run this command!');

	if(!muteRole) return message.channel.send(errEmbed);

	const success = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setAuthor('Command successfully executed!')
		.setDescription(`Mute role successfully set as **\`${muteRole.name}\`**`);
	const success2 = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setAuthor('Command successfully executed!')
		.setDescription(`Mute role successfully set as **\`${muteRole.name}\`**`);
	const argcheck = new Discord.MessageEmbed()
		.setColor('#FF0000')
		.setAuthor('Error executing the command')
		.setDescription('Please provide a role to set as muterole!');

	if(!args) return message.channel.send(argcheck);

	if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(perms);
	guildData.mute_role = muteRole.id;
	guildData.save();
	message.channel.send(success);
};
module.exports.help = {
	aliases: ['mutedrole'],
	name: 'muterole',
	description: 'Change the guild\'s mute role',
	usage: 'muterole @role',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 10000,
};