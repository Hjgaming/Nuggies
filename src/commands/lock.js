/* eslint-disable no-unused-vars */
module.exports.run = async (client, message, args, utils) => {
	if (!client.lockit) client.lockit = [];
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');

	message.channel.createOverwrite(message.guild.id, {
		SEND_MESSAGES: false,
	});
	message.channel.send(`Damnn, **${message.author.username}** just locked the channel down. Don't worry, Admins will soon open the chat again so be patient.`);
};

module.exports.help = {
	aliases: ['lockdown'],
	name: 'lock',
	description: 'nein',
	usage: 'lock',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'misc',
};