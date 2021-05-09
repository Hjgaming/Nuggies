/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const users = require('../../../models/users');
module.exports.run = async (client, message, args, utils) => {


	const target = args[0];
	if(!target) return message.channel.send(new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a user!').setColor('RED'));
	const tier = args[1];
	const checkUser = await client.users.fetch(target);
	if (checkUser) const userData = await utils.findOrCreateUser(client, { id: target });
	if (!checkUser) return message.channel.send(new Discord.MessageEmbed().setTitle(':warning: Error').setDescription(`${target} is not a valid user id. Not even sure what you're on about`,).setColor('RED'));

		userData.tier = tier;
		userData.premium = true;
		userData.save();
		message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`premium set to \`tier ${tier}\` for **${client.users.cache.get(target).tag}** `).setColor('GREEN'));
		client.channels.cache.get('828996803855777882').send(new Discord.MessageEmbed().setTitle(`Premium tier ${tier} added to ${client.users.cache.get(target).username}`).setColor('GREEN'));
};
module.exports.help = {
	aliases: ['setuserp', 'userp'],
	name: 'setuserpremium',
	description: 'set a user premium',
	usage: '.setuserpremium <ID> <toggle> <tier>',
};

module.exports.config = {
	developers: true,
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 0,
};
