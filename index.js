require('dotenv').config();
require('./utils/ExtendedMessage');
const Discord = require('discord.js');
const Nuggies = require('./utils/Nuggies');
const client = new Nuggies({ disableMentions: 'everyone', intents: Discord.Intents.ALL });

client.start(process.env.token, process.env.mongo);
const unhhook = new Discord.WebhookClient(process.env.unhandled_rejection_webhook_id, process.env.command_webhook_token);

// For any unhandled errors
process.on('unhandledRejection', async (err) => {
	if (client.user) {
		if (client.user.id === '800588645006311444') {
			const errEmbed = new Discord.MessageEmbed().setTitle('unhandledRejection Error').setDescription(err.stack, { code: 'ini' }).setTimestamp();
			unhhook.send(errEmbed);
		}
	}
	return console.log(err);
});