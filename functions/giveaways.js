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
		await this.startTimer(message, data);
	},

	async startTimer(message, data) {
		const msg = await message.guild.channels.cache.get(data.channelID).messages.fetch(data.messageID);
		await msg.fetch();
		const time = data.endAt - Date.now();
		setTimeout(async () => {
			const reaction = await msg.reactions.cache.get('🎉') || msg.reactions.cache.get('843076397345144863');
			const reacts = await reaction.users.fetch({ limit: 100 });
			const winners = await this.choose(reacts.filter(x => !x.bot), data.winners);

			message.channel.send(`${winners.map(winner => winner.toString()).join(', ')} you won ${data.prize} Congratulations! Hosted by ${message.guild.members.cache.get(data.hoster).toString()}`, { allowedMentions: { roles: [], users: winners.map(x => x.id), parse: [] } });
		}, time);
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

	async reroll(client, messageID) {
		const data = await this.getByMessageID(messageID);
		const msg = client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(messageID);
		const reaction = msg.reactions.cache.get('🎉');
		const reacts = await reaction.users.fetch({ limit: Infinity });
		return await this.choose(reacts, 1);
	},

	async choose(reactions, winners) {
		const final = [];
		for (let i = 0; i < winners; i++) {
			const win = reactions.random();
			reactions = reactions.filter(user => user.id !== win.id);
			final.push(win);
		}
		return final;
	},

	async end(messageID) {
		// Later...
	},
};