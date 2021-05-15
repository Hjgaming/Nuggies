const schema = require('../models/giveaways');
const { giveawayEmbed } = require('../utils/utils');

module.exports = {
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
		this.startTimer(message, data);
	},

	async startTimer(message, data) {
		const msg = message.guild.channels.cache.get(data.channelID).messages.fetch(data.messageID);
		setTimeout(async () => {
			const reaction = msg.reactions.cache.get('🎉') || msg.reactions.cache.get('843076397345144863');
			const reacts = await reaction.users.fetch({ limit: Infinity });
			const winners = this.choose(reacts, data.winners);

			message.channel.send(`${winners.map(winner => winner.toString()).join(', ')} you won ${data.prize} Congratulations! Hosted by ${message.guild.members.cache.get(data.hoster).toString()}`, { allowedMentions: { roles: [], users: [], parse: [] } });
		}, Date.now() - data.endAt);
	},

	async getByGuildID(guildID) {
		const docs = await schema.find({ guildID: guildID });

		if (!docs[0]) return;
		return docs;
	},

	async getByMessageID(messageID) {
		const doc = await schema.findOne({ messageID: messageID });

		if (!doc) return;
		return doc;
	},

	async getByChannelID(channelID) {
		const docs = await schema.find({ channelID: channelID });

		if (!docs[0]) return;
		return docs;
	},

	async reroll(messageID) {
		// Later...
	},

	async choose(reactions, winners) {
		// Later....
	},

	async end(messageID) {
		// Later...
	},
};