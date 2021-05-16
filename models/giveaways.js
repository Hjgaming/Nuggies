const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	guildID: {
		type: String, required: true,
	},
	channelID: {
		type: String, required: true,
	},
	messageID: {
		type: String, required: true,
	},
	hoster: {
		type: String, required: true,
	},
	endAt: {
		type: Date, required: true,
	},
	startAt: {
		type: Date, required: true,
	},
	prize: {
		type: String, required: true,
	},
	winners: {
		type: Number, required: true,
	},
	ended: {
		type: Boolean, default: false,
	},
});

module.exports = mongoose.model('giveaways', schema);