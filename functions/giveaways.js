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

	async get(guildID) {
		const docs = await schema.find({ guildID: guildID });
	},
};