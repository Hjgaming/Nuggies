const giveaways = require('../../../functions/giveaways');

module.exports.run = async (client, message, args) => {
	const winners = await giveaways.end(client, args[0]);
	if(!winners) return message.channel.send('There are not enough people in the giveaway!');

	const data = await giveaways.getByMessageID(args[0]);

	message.channel.send(`${winners.map(winner => winner.toString()).join(', ')} you won ${data.prize} Congratulations! Hosted by ${message.guild.members.cache.get(data.hoster).toString()}`, { allowedMentions: { roles: [], users: winners.map(x => x.id), parse: [] } });

	data.ended = true;
	data.save();
};

module.exports.help = {
	name: 'end',
	description: '',
	aliases: [],
	usage: '',
};

module.exports.config = {
	args: true,
	category: 'giveaways',
	cooldown: 1000,
};