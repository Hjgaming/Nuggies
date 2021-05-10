/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils) => {
	const lb = await client.data.pointsleaderboard(10);

	await lb.leaderboard.forEach(async (i) => {
	  try {
		await client.users.fetch(i.id);
	  } catch (error) {
		return;
	  }
	});
	index = 1; //${index += 1}.
	mapped = await lb.leaderboard.map(
	  (i) =>
		`\`${index += 1}\`- **${i.points.toLocaleString()}** - ${
		  client.users.cache.get(i.id) ? client.users.cache.get(i.id).tag : "Unknown#0000"
		}`
	);
	return message.channel.send(
		new Discord.MessageEmbed()
		.setTitle('Global Points Leaderboard')
		.setDescription(`${mapped.join("\n")}`)
		.setTimestamp()
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