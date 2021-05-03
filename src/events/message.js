//                                               -- All our requirements --

const Discord = require('discord.js');
const config = require('../../utils/config.json');
const chatbase = 'https://api.affiliateplus.xyz/api';
const fetch = require('node-fetch');

module.exports = async (client, message) => {
	//                                               -- Message Event Function --
	if (!message.guild) return;

	// nuggies x pwetzel chat

	// if (message.channel.id === '814411982702510111' && message.author.id == '723112579584491571') {
	// 	setTimeout(async function() {
	// 		message.channel.startTyping();
	// 		await chatting.chat(message.content)
	// 			.then((reply) => {
	// 				message.inlineReply(Discord.Util.removeMentions(reply));
	// 				message.channel.stopTyping();
	// 			}).catch((error) => {
	// 				message.channel.send(`\`❌ CHAT ERROR\` \`\`\`xl\n${error}\n\`\`\``);
	// 				message.channel.stopTyping();
	// 			});
	// 	}, 3000);
	// }

	if (message.author.bot) return;

	// Fetch database

	let guildDB;
	if (client.cache.guilds) guildDB = await client.data.getGuildDB(message.guild.id);
	let userDB;
	if (client.cache.users) userDB = await client.data.getUserDB(message.author.id);
	const data = {};
	data.guild = guildDB;
	data.user = userDB;

	// Blacklist check
	if (data.user) if (data.user.blacklisted) return;

	// AFK thingy
	if (userDB) {
		if (userDB.is_afk) {
			await client.data.removeAfk(message.author.id);
			message.channel.send(Discord.Util.removeMentions('Welcome back **' + message.author.username + '**! You are no longer afk.'))
				// eslint-disable-next-line no-unused-vars
				.catch((error) => {
					return true;
				});
		}
	}

	message.mentions.users.forEach(async (u) => {
		if (!client.data.users) return;
		const userData = await client.data.getUserDB(u.id);
		if (userDB.is_afk) {
			message.channel.send(`**${u.tag}** is currently afk for: **${userData.afkReason}**`)
				// eslint-disable-next-line no-unused-vars
				.catch((error) => {
					return true;
				});
		}
	});

	// Chatbot thingy
	if (data) {
		if (data.guild) {
			if (data.guild.chatbot_enabled && data.guild.chatbot_channel == message.channel.id) {
				const badwords = ['nigger', 'nigga', 'nibba', 'nibber'];
				const bl_log_channel = client.channels.cache.get('809317042058035241');
				const reason = 'saying a blacklisted word.';
				if (badwords.some((word) => message.content.toLowerCase().includes(word))) {
					const blacklist = await client.data.blacklist(message.author.id, 'true', reason);
					const logEmbed = new Discord.MessageEmbed().setTitle('<a:9689_tick:785181267758809120> User Blacklisted').setDescription(`**${message.author.username}#${message.author.discriminator}** was blacklisted from using the bot.\n\nResponsible Moderator : **${message.author.username}**\n\nReason : **${blacklist.reason}** \n **message**: ${message.content}`).setFooter('Blacklist registered').setColor('RED').setTimestamp();
					bl_log_channel.send(logEmbed);
					message.author.send(`You have been blacklisted from using the bot! \n **Reason:** ${reason}\n **Moderator:** ${message.author.tag} \n**Join Nuggies Support to appeal:** https://discord.gg/ut7PxgNdef`).catch((err) => {
						message.channel.send(`${message.author.username} has DM's disabled. I was unable to send him a message - but blacklist has been registered!`);
						console.log(err);
						return;
					});
				}

				const channel = data.guild.chatbot_channel;
				if (!channel) return;
				const sChannel = message.guild.channels.cache.get(channel);
				if (sChannel.id !== message.channel.id) return;
				sChannel.startTyping();
				if (!message.content) return sChannel.stopTyping();
				try {
					const basefetch = await fetch(`${chatbase}/chatbot?message=${encodeURIComponent(message.content)}&botname=${encodeURIComponent('Nuggies')}&ownername=${encodeURIComponent('AssassiN#1234')}&user=${message.author.id}`, {});
					const response = await basefetch.json();
					message.reply(response.message, { allowedMentions: { parse: [], users: [], roles: [], repliedUser: false } });
				}
				catch (e) {
					message.reply('something went wrong! please report it on our support server discord.gg/d98jT3mgxf');
					console.log(e);
					return sChannel.stopTyping;
				}
				sChannel.stopTyping();
			}
		}
	}

	// Ping Embed
	// Get prefix from guild else get from config file
	let prefixx;
	if (client.cache.guilds) prefixx = !guildDB.prefix ? config.prefix : guildDB.prefix;
	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		const m = new Discord.MessageEmbed()
			.setTitle('Hi, I\'m Nuggies !')
			.setDescription('One of the most compact and easy to use bot on Discord!')
			.addField('Prefix and Usage', !client.cache.guilds ? '**The bot is still starting!**' : 'My current prefixes are ' + `\`${prefixx}\` and <@${client.user.id}>` + `\n *Tip: Run \`${prefixx}help\` to get started! | use \`${prefixx}setprefix <prefix>\` to change prefix!*`)
			.addField('Invites :', '[Support server](https://discord.gg/ut7PxgNdef) | [Bot invite](https://discord.com/oauth2/authorize?client_id=779741162465525790&permissions=1609952503&scope=bot%20applications.commands)')
			.setColor('RANDOM');
		message.channel.send(m);
	}
	// Command handler moved to /src/handler/command/commandHandler.js
};
