const giveaways = require('../../../functions/giveaways');

module.exports.run = async (client, message, args) => {
	const win = await giveaways.reroll(client, args[0]);
	message.channel.send(`Rerolled! ${win} is the new winner of the giveaway!`);
};

module.exports.help = {
	name: 'reroll',
	description: '',
	aliases: [],
	usage: '',
};

module.exports.config = {
	args: true,
	category: 'giveaways',
	cooldown: 1000,
};