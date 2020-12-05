/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../utils/config.json');

const blacklist = require('../../models/blacklistSchema');
module.exports.run = async (client, message, args, utils) => {
	if(!config.globalmods.includes(message.author.id)) return;
	if(config.globalmods.includes(message.author.id)) return message.channel.send('you cannot blacklist a global moderator.');
	const User = args[0];
	blacklist.findOne({ id : User }, async (err, data) => {
		if(err) throw err;
		if(data) {
			message.channel.send('user is already blacklisted!');
		}
		else {
			data = new blacklist({ id : User });
			data.save()
				.catch(err => console.log(err));
			const target = client.users.cache.get(args[0]);
			target.send('You have been blacklisted from using the bot! \n \n **join this server to appeal:** https://discord.gg/nKBHkSf');
			message.channel.send(`blacklisted **${target.username + '#' + target.discriminator}**`);
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'blacklist',
	description: 'Blacklist a person from the bot',
	usage: 'Why do you wanna know?',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'moderation',
};