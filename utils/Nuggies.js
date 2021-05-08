const { Client, Collection } = require('discord.js');
const CommandHandler = require('../src/handler/command/commandHandler');
const EventHandler = require('../src/handler/event/eventHandler');
const { prefix } = require('./config.json');

class Nuggies extends Client {

	/**
	 * @param {Client.options} options
	 */

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
		this.soundboardqueue = new Collection();
		// Database

		this.usersData = require('../models/users.js');
		this.guildsData = require('../models/guilds.js');
		this.dbCache = {};
		this.dbCache.users = new Collection();
		this.dbCache.guilds = new Collection();

		// Handlers
		this.eventHandler = new EventHandler(this);
		this.commandHandler = new CommandHandler(this, { prefix });
	}

	// async findOrCreateUser({ id: userID }, isLean) {
	// 	if (this.dbCache.users.get(userID)) { 
	// 		return isLean ? this.dbCache.users.get(userID).toJSON() : this.dbCache.users.get(userID);
	// 	} else {
	// 		let userData = isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID });
	// 		if (userData) {
	// 			if (!isLean) this.dbCache.users.set(userID, userData);
	// 			return userData;
	// 		} else { // eslint-disable-next-line new-cap
	// 			userData = new this.usersData({ id: userID });
	// 			await userData.save();
	// 			this.dbCache.users.set(userID, userData);
	// 			return isLean ? userData.toJSON() : userData;
	// 		}
	// 	}
	// }

	// async findOrCreateGuild({ id: guildID }, isLean) {
	// 	if (this.dbCache.guilds.get(guildID)) {
	// 		return isLean ? this.dbCache.guilds.get(guildID).toJSON() : this.dbCache.guilds.get(guildID);
	// 	} else {
	// 		let guildData = isLean ? await this.guildsData.findOne({ id: guildID }).populate('members').lean() : await this.guildsData.findOne({ id: guildID }).populate('members');
	// 		if (guildData) {
	// 			if (!isLean) this.dbCache.guilds.set(guildID, guildData);
	// 			return guildData;
	// 		} else { // eslint-disable-next-line new-cap
	// 			guildData = new this.guildsData({ id: guildID });
	// 			await guildData.save();
	// 			this.dbCache.guilds.set(guildID, guildData);
	// 			return isLean ? guildData.toJSON() : guildData;
	// 		}
	// 	}
	// }

	/**
	 * @param {String} token Bot's Token
	 * @param {String} mongoDB Your monogDB URL
	 */

	start(token, mongoDB) {
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
