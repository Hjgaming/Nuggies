const { Client, Collection } = require('discord.js');

class Nuggies extends Client {
	constructor(options) {
		super(options);

		// Global variables
		this.commands = new Collection();
		this.cooldowns = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();
		this.snipes = new Collection();
		this.esnipes = new Collection();
		this.data = require('../functions/mongo');
		this.reminders = new Collection();
	}

	/**
     * @param {String} token Bot's Token
     * @param {String} mongoDB Your monogDB URL
     */
	start(token, mongoDB) {
		require('./startUp')(this);

		this.data.connect(mongoDB)
			.then(() => {
				// If it connects log the following
				console.log('Connected to MongoDB database!');
			}).catch((err) => {
				// If it doesn't connect log the following
				console.log('Unable to connect to the Mongodb database. Error:' + err);
			});

		this.login(token);
	}
}

module.exports = Nuggies;