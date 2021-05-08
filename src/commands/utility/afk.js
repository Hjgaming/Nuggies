/* eslint-disable no-unused-vars */
module.exports.run = async (client, message, args, utils) => {
	const afkreason = args.join(' ') || 'AFK';

	const userData = await client.findOrCreateUser({ id: message.author.id });

	userData.is_afk = true;
	userData.afkReason = afkreason;
	userData.save();

	message.channel.send(`You are now afk for: **\`${afkreason}\`**`, { allowedMentions: { parse: [], roles: [], users: [] } });
};


module.exports.help = {
	aliases: [],
	name: 'afk',
	description: 'afk...',
	usage: '.afk listning to juice wrld',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Utility',
	disable: false,
};