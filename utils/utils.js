const Discord = require('discord.js');

module.exports.uCError = function(errorMessage) {
	throw `[Error] | ${errorMessage}`;
};

module.exports.uCWarning = function(warningMessage) {
	console.warn(`[Warning] | ${warningMessage}. Proceeding.`);
};

module.exports.prefix = require('./config.json').prefix;

module.exports.errorEmbed = function(message, errorMessage) {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle(errorMessage);
	message.channel.send({ embed: errorEmbed });
};

module.exports.quickEmbed = function(message, content, color) {
	const quickEmbed = new Discord.MessageEmbed();
	if (color) quickEmbed.setColor(color);
	quickEmbed.setDescription(content);
	message.channel.send({ embed: quickEmbed });
};

module.exports.selectRandom = function(array) {
	if (typeof array !== 'object') return;
	return array[Math.floor((Math.random() * array.length) + 0)];
};

module.exports.timer = function(timestamp) {
	const timeLeft = timestamp - Date.now();
	const days = Math.floor(timeLeft / 86400000);
	const hours = Math.floor(timeLeft / 3600000) - (days * 24);
	const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
	const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	const mseconds = (timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	let string = '';
	if (days) string = string + `${days} ${days == 1 ? 'day ' : 'days '}`;
	if (hours) string = string + `${hours} ${hours == 1 ? 'hour ' : 'hours '}`;
	if (minutes) string = string + `${minutes} ${minutes == 1 ? 'minute ' : 'minutes '}`;
	if (seconds) string = string + `${seconds} ${seconds == 1 ? 'second ' : 'seconds '}`;
	if (!string.length) string = `${mseconds.toFixed(1)} second`;
	return string;
};

module.exports.findOrCreateUser = async function(client, { id: userID }, isLean) {
	if (client.dbCache.users.get(userID)) {
		return isLean ? client.dbCache.users.get(userID).toJSON() : client.dbCache.users.get(userID);
	}
	else {
		let userData = isLean ? await client.usersData.findOne({ id: userID }).lean() : await client.usersData.findOne({ id: userID });
		if (userData) {
			if (!isLean) client.dbCache.users.set(userID, userData);
			return userData;
		}
		else { // eslint-disable-next-line new-cap
			userData = new client.usersData({ id: userID });
			await userData.save();
			client.dbCache.users.set(userID, userData);
			return isLean ? userData.toJSON() : userData;
		}
	}
};

module.exports.findOrCreateGuild = async function(client, { id: guildID }, isLean) {
	if (client.dbCache.guilds.get(guildID)) {
		return isLean ? client.dbCache.guilds.get(guildID).toJSON() : client.dbCache.guilds.get(guildID);
	}
	else {
		let guildData = isLean ? await client.guildsData.findOne({ id: guildID }).lean() : await client.guildsData.findOne({ id: guildID });
		if (guildData) {
			if (!isLean) client.dbCache.guilds.set(guildID, guildData);
			return guildData;
		}
		else { // eslint-disable-next-line new-cap
			guildData = new client.guildsData({ id: guildID });
			await guildData.save();
			client.dbCache.guilds.set(guildID, guildData);
			return isLean ? guildData.toJSON() : guildData;
		}
	}
};

module.exports.giveawayEmbed = async function(client, { hoster, prize, endAt, winners }) {
	const host = client.users.cache.get(hoster) || await client.users.fetch(hoster).catch();
	const embed = new Discord.MessageEmbed()
		.setTitle('Giveaway! <:blurpletada:843076397345144863>')
		.setDescription(`**React with <:blurpletada:843076397345144863> to enter the giveaway!**\n🎁 Prize: **${prize}**\n🎊 Hosted by: ${host.toString()}\n⏲️ Winner(s): \`${winners}\``)
		.setColor('RANDOM')
		.setFooter('Ends', 'https://cdn.discordapp.com/emojis/843076397345144863.png?v=1')
		.setTimestamp(endAt);
	return embed;
};