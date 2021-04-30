const mongoose = require('mongoose');

const disableSchema = new mongoose.Schema({
	guildID: String,
	category: {
		type: Array,
		default: [],
	},
	commands: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model('disables', disableSchema);