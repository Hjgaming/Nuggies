/* eslint-disable no-unused-vars */
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {
	const member = message.mentions.members.first() || message.member;
	const user = await client.economy.findUser(member.id);

	if(user == false) {
		await client.economy.createUser(member.id);
		message.channel.send(`**${member.user.username}'s balance** \n \n <:nugget:837361113771147324> **Nuggets:** 0 \n <:fridge:837360115228606464> **Fridge**: 0`);
		return console.log('logging false');
	}
	message.channel.send(`**${member.user.username}'s balance** \n \n <:nugget:837361113771147324> **Nuggets:** ${user.nuggets} \n <:fridge:837360115228606464> **Fridge**: ${user.fridge}`);
	return console.log('logging true');
};

module.exports.help = {
	aliases: ['bal'],
	name: 'balance',
	description: 'get balance',
	usage: config.prefix + 'bal',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Economy',
	disable: false,
	cooldown: 1000,
};