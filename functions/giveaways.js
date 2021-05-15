const schema = require('../models/giveaways');
const { giveawayEmbed } = require('../utils/utils');

module.exports = {
	async create({
		message, prize, hoster, winners, endAt,
	}) {
		const msg = await message.channel.send(await giveawayEmbed(message.client, { hoster, prize, endAt, winners }));
		await new schema({
			messageID: msg.id,
			channelID: msg.channel.id,
			guildID: msg.guild.id,
			hoster: hoster,
			winners: winners,
			prize: prize,
			startAt: Date.now(),
			endAt: endAt,
		});
		msg.react(message.client.emojis.cache.get('843076397345144863') || '🎉');
	},

	async getByGuildID(guildID) {
		const docs = await schema.find({ guildID: guildID });

		if(!docs[0]) return;
		return docs;
	},

	async getByMessageID(messageID) {
		const doc = await schema.findOne({ messageID: messageID });

		if(!doc) return;
		return doc;
	},

	async getByChannelID(channelID) {
		const docs = await schema.find({ channelID: channelID });

		if(!docs[0]) return;
		return docs;
	},

	async reroll(messageID) {
		// Later...
	},

	async choose() {
		// Later....
	},

	async end(messageID) {
		// Later...
	},
};