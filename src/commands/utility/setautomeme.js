/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const guildData = await client.findOrCreateGuild({ id: message.guild.id });
	const userData = await client.findOrCreateUser({ id: message.author.id });

	if(userData.premium == false) return message.channel.send(new MessageEmbed().setTitle('Error').setDescription('This command is only for donors, please [__**click here**__](https://bot.nuggetdev.com/premium) to donate!').setColor('RED'));
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission.');
	const channel = message.mentions.channels.first();
	if(args[1] === 'true') {
		if(!channel) {
			const m = new MessageEmbed()
				.setColor('red')
				.addField('Error', 'Please mention a channel');
			message.channel.send(m);
			return;
		}
		if(guildData.automeme_channel == channel.id) {
			return message.channel.send(new MessageEmbed()
				.setColor('red')
				.addField('Error', `automeme is already \`true\` in <#${channel.id}>`));
		}
		guildData.automeme_enabled = true;
		guildData.automeme_channel = channel.id;
		guildData.save();
		const me = new MessageEmbed()
			.setColor('GREEN')
			.addField('Success', `automeme set to \`true\` in <#${channel.id}>`);
		message.channel.send(me);
	}
	else if (args[1] === 'false') {
		if(!channel) {
			const m = new MessageEmbed()
				.setColor('red')
				.addField('Error', 'Please mention a channel');
			message.channel.send(m);
			return;
		}
		if(guildData.automeme_channel !== channel.id) {
			const n = new MessageEmbed()
				.setColor('red')
				.addField('Error', `automeme is already \`false\` in <#${channel.id}>`);
			message.channel.send(n);
			return;
		}
		guildData.automeme_enabled = false;
		guildData.automeme_channel = 'null';
		guildData.save();
		const a = new MessageEmbed()
			.setColor('GREEN')
			.addField('Success', `automeme successfully set to \`false\` in <#${channel.id}>`);
		message.channel.send(a);
	}
	else {
		const v = new MessageEmbed()
			.setColor('RED')
			.addField('Error', 'please follow the following format - .setautomeme <channel mention> true/false');
		message.channel.send(v);
	}

};

module.exports.help = {
	aliases: [],
	name: 'setautomeme',
	description: 'enable/disable automeme in a channel !',
	usage: '.setautomeme <channel mention> true/false',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 10000,
};