/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
// const help = require('../../../data/helpmessages.json');
const config = require('../../../utils/config.json');
const fs = require('fs');

module.exports.help = {
	aliases: ['halp'],
	name: 'help',
	description: 'You can\'t be helped 😔',
	usage: config.prefix + 'help',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Information',
	disable: false,
	cooldown: 1000,
};

module.exports.run = async (client, message, args, utils, data) => {
	try {
		const prefix = data.guild.prefix;
		if (!args[0]) {
			const a = new Discord.MessageEmbed()
				.setTitle('Hello! I\'m Nuggies!')
				.setDescription('For more info about a specific command: use .help {command} \n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=779741162465525790&permissions=1609952759&scope=applications.commands%20bot) ・ [support server](https://https://discord.gg/zzURhQGpRY)')
				.addField('<:slash:782701715479724063> Slash commands', `\`${prefix}help slash-commands\``, true)
				.addField('<:bfdmoderator:807662459879817236> Moderation', `\`${prefix}help moderation\``, true)
				.addField('<:information:807646586884063283> Info', `\`${prefix}help info\``, true)
				.addField('<a:LX_Yay:807646869948727307> Fun', `\`${prefix}help fun\``, true)
				.addField('<a:distraction:807647150438744064> Actions', `\`${prefix}help actions\``, true)
				.addField('<a:Loading:785190101105508373> More', `\`${prefix}help more\``, true)
				.addField('⚙ Utility', `\`${prefix}help utility\``, true)
				.addField('🎙 Soundboard', `\`${prefix}help soundboard\``, true)
				//  .addField('<a:music_disc:826830791115931719>', `\`${prefix}help music\``, true)
				.setFooter('Check out our website:  https://nuggetdev.com/')
				.setThumbnail(client.user.avatarURL({ type: 'png' }))
				.setColor('RANDOM');
			message.channel.send(a);
		}
		else {
			const categoryArray = fs.readdirSync('src/commands');
			const category = categoryArray.filter(x => x === args[0].toLowerCase()).join('');
			if (category) {
				const cmds = client.commands.filter(x => x.config.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(', ');
				const cmdsEmbed = new Discord.MessageEmbed()
					.setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`)
					.setDescription(cmds)
					.setColor('RANDOM')
					.setFooter('Page 1/1');
				return message.channel.send(cmdsEmbed);
			}
			else if (args[0] === 'slash-commands') {
				const slashCmdsembed = new Discord.MessageEmbed()
					.setTitle('Slash Commands')
					.setDescription('`/meme`, `/cat`, `/8ball`, `/echo`, `/support`, `/activities` (use @Nuggies register) to register')
					.setColor('RANDOM')
					.setFooter('Page 1/1');
				return message.channel.send(slashCmdsembed);
			}
			else if (client.commands.has(args[0])) {
				const cmd = client.commands.get(args[0]);
				const b = new Discord.MessageEmbed()
					.setTitle(`${cmd.help.name.slice(0, 1).toUpperCase()}${cmd.help.name.slice(1).toLowerCase()} Command!`)
					.addField('``Description:``', cmd.help.description, true)
					.addField('``Usage:``', cmd.help.usage, true)
					.addField('``Aliases:``', cmd.help.aliases, true)
					.addField('``Category``', cmd.config.category, true)
					.addField('``Disabled``', cmd.config.disable ? 'Yes' : 'No', true)
					.setColor('RANDOM');
				return message.channel.send(b);
			}
			else {
				return message.reply(':x: I couldn\'t find that command!');
			}
		}
	}
	catch(err) {
		console.log(err);
	}
};