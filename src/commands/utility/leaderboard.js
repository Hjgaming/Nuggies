/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const lb = await client.data.pointsleaderboard(10);

	await lb.leaderboard.forEach(async (i) => {
		try {
			await client.users.fetch(i.id);
		}
		catch (error) {
			return;
		}
	});
	let index = 1; // ${index += 1}.
	const mapped = await lb.leaderboard.map(
		(i) =>
			`\`${index += 1}\`- **${i.points.toLocaleString()}** - ${
				client.users.cache.get(i.id) ? client.users.cache.get(i.id).tag : 'Unknown#0000'
			}`,
	);
	return message.channel.send(
		new Discord.MessageEmbed()
			.addField('What are the points for? \n ', 'You get points for afk-ing on https://afk.nuggetdev.com/ \n _ _')
			.addField('what to do with these points? \n', 'the top 3 people with the most points at the end of the month will get amazing prizes like **Discord Nitro** :smirk: \n _ _')
			.addField('Points:', `${mapped.join('\n')}`)
			.setTitle('Global Points Leaderboard')
			.setTimestamp()
			.setColor('RANDOM'),
	);
};

module.exports.help = {
	aliases: [],
	name: 'leaderboard',
	description: 'check the leaderboard',
	usage: '.leaderboard',
};
module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
	cooldown: 1000 * 60,
};