/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const schema = require('../models/giveaways');
const { giveawayEmbed } = require('../utils/utils');
const Discord = require('discord.js');

module.exports = {

	/**
	 * @returns {undefined}
	 */

	async create({
		message, prize, hoster, winners, endAt,
	}) {
		const msg = await message.channel.send(await giveawayEmbed(message.client, { hoster, prize, endAt, winners }));
		const data = await new schema({
			messageID: msg.id,
			channelID: msg.channel.id,
			guildID: msg.guild.id,
			hoster: hoster,
			winners: winners,
			prize: prize,
			startAt: Date.now(),
			endAt: endAt,
		}).save();
		msg.react(message.client.emojis.cache.get('843076397345144863') || '🎉');
		await this.startTimer(message, data);
	},

	/**
	 * @param {Discord.Message} message
	 * @param {mongoose.Document} data
	 * @returns {undefined}
	 */

	async startTimer(message, data) {
		const msg = await message.guild.channels.cache.get(data.channelID).messages.fetch(data.messageID);
		await msg.fetch();
		const time = data.endAt - Date.now();
		setTimeout(async () => {
			if((await this.getByMessageID(data.messageID)).ended) return;
			const reaction = await msg.reactions.cache.get('🎉') || msg.reactions.cache.get('843076397345144863');
			const reacts = await reaction.users.fetch({ limit: 100 });
			const winners = await this.choose(reacts.filter(x => !x.bot), data.winners);

			if(!winners) return message.channel.send('There are not enough people in the giveaway!');

			message.channel.send(`${winners.map(winner => winner.toString()).join(', ')} you won ${data.prize} Congratulations! Hosted by ${message.guild.members.cache.get(data.hoster).toString()}`, { allowedMentions: { roles: [], users: winners.map(x => x.id), parse: [] } });
			data.ended = true;
			data.save();
		}, time);
	},

	/**
	 * @param {String} guildID
	 * @returns {mongoose.Document[]}
	 */

	async getByGuildID(guildID) {
		const docs = await schema.find({ guildID: guildID });

		if (!docs[0]) return;
		return docs;
	},

	/**
	 * @param {String} messageID
	 * @returns {mongoose.Document}
	 */

	async getByMessageID(messageID) {
		const doc = await schema.findOne({ messageID: messageID });

		if (!doc) return;
		return doc;
	},

	/**
	 * @param {String} channelID
	 * @returns {mongoose.Document[]}
	 */

	async getByChannelID(channelID) {
		const docs = await schema.find({ channelID: channelID });

		if (!docs[0]) return;
		return docs;
	},

	/**
	 * @param {Discord.Client} client
	 * @param {String} messageID
	 * @returns {Discord.User[]}
	 */

	async reroll(client, messageID) {
		const data = await this.getByMessageID(messageID);
		const msg = await client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(messageID);
		const reaction = await msg.reactions.cache.get('🎉');
		const reacts = await reaction.users.fetch({ limit: 100 });
		return await this.choose(reacts, 1);
	},

	/**
	 * @param {Discord.Collection<Discord.Snowflake, Discord.User>} reactions
	 * @param {String} winners
	 * @returns {Discord.User[]}
	 */

	async choose(reactions, winners) {
		const final = [];
		for (let i = 0; i < winners; i++) {
			if(!reactions.first()) return;
			const win = reactions.filter(x => !x.bot).random();
			reactions = reactions.filter(user => user.id !== win.id && !user.bot);
			final.push(win);
		}
		return final;
	},

	/**
	 * @param {Discord.Client} client
	 * @param {String} messageID
	 * @returns {Discord.User[]}
	 */

	async end(client, messageID) {
		const data = await this.getByMessageID(messageID);
		const msg = await client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(messageID);
		const reaction = await msg.reactions.cache.get('🎉');
		const reacts = await reaction.users.fetch({ limit: 100 });
		return await this.choose(reacts, data.winners);
	},
};