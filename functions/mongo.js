const mongoose = require('mongoose');
const { GooseCache } = require('goosecache');
const cachegoose = new GooseCache(mongoose, {
	engine: 'memory',
});
mongoose.set('useFindAndModify', false);
const usersDB = require('../models/users');
const guildsDB = require('../models/guilds');
const pointsDB = require('../models/pointsSchema');
module.exports = {
	/**
     * @param {string} uri - Mongo Connection URI
     */
	async connect(uri) {
		if (!uri) throw new Error('Please provide a Mongoose URI');
		return mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	/**
     * @param {string} guildID - ID of the Guild
     */
	async getGuildDB(guildID) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		const guild = await guildsDB.findOne({ id: guildID }).lean().cache(120);
		if (!guild) {
			const newG = new guildsDB({ id: guildID });
			const {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				category,
				commands,
			} = newG;
			await newG.save().catch(error => console.log(error));
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				category,
				commands,
			};
		}
		else {
			const prefix = guild.prefix;
			const registeredAt = guild.registeredAt;
			const chatbot_enabled = guild.chatbot_enabled;
			const chatbot_channel = guild.chatbot_channel;
			const automeme_enabled = guild.automeme_enabled;
			const automeme_channel = guild.automeme_channel;
			const mute_role = guild.mute_role;
			const premium = guild.premium;
			const category = guild.category;
			const commands = guild.commands;
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				category,
				commands,
			};
		}
	},
	/**
   * @param {string} userID - ID of the User
   */
	async getUserDB(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID }).lean().cache(120);
		if (!user) {
			const newUs = new usersDB({ id: userID });
			const { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator, todo } = newUs;
			await newUs.save().catch(error => console.log(error));
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator, todo };
		}
		else {
			const registeredAt = user.registeredAt;
			const blacklisted = user.blacklisted;
			const blacklisted_reason = user.blacklisted_reason;
			const is_afk = user.is_afk;
			const afkReason = user.afkReason;
			const premium = user.premium;
			const tier = user.tier;
			const premiumservers = user.premiumservers;
			const developer = user.developer;
			const moderator = user.moderator;
			const todo = user.todo;
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator, todo };
		}
	},
	/**
   * @param {string} userID - ID of the User
   * @param {string} reason - afk reason
   */
	async setAfk(userID, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!reason) throw new Error('AFK reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { reason };
		}
		else {
			user.is_afk = true;
			user.afkReason = reason;
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
	},
	/**
    * @param {string} userID - ID of the User
    */
	async removeAfk(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { userID };
		}
		else {
			user.is_afk = false;
			user.afkReason = null;
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { userID };
		}
	},
	/**
* @param {string} userID - ID of the User
* @param {string} toggle - blacklist toggle
* @param {string} reason - blacklisted reason
*/
	async blacklist(userID, toggle, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!toggle) throw new Error('Please Provide a toggle');
		if (!reason) throw new Error('Blacklist reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await newUs.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
		else {
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return { reason };
		}
	},
	/**
 * @param {string} guildID - ID of the Guild
 */
	async deleteGuild(guildID) {
		await guildsDB.deleteOne({ id: guildID });
		return;
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} prefix - Guild prefix
     */
	async setPrefix(guildID, prefix) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!prefix) throw new Error('Please Provide a prefix!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { prefix };
		}
		guild.prefix = prefix;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { prefix };
	},
	/**
	* @param {string} userID - ID of the User
	* @param {string} toggle - blacklist toggle
	*/
	async developer(userID, toggle) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!toggle) throw new Error('Please Provide a toggle');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			if (toggle == 'true') {
				user.developer = true;
			}
			else {
				user.developer = false;
			}
			await newUs.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return;
		}
		else {
			if (toggle == 'true') {
				user.developer = true;
			}
			else {
				user.developer = false;
			}
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return;
		}
	},
	/**
	* @param {string} userID - ID of the User
	* @param {string} toggle - blacklist toggle
	*/
	async moderator(userID, toggle) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!toggle) throw new Error('Please Provide a toggle');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			if (toggle == 'true') {
				user.moderator = true;
			}
			else {
				user.moderator = false;
			}
			await newUs.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return;
		}
		else {
			if (toggle == 'true') {
				user.moderator = true;
			}
			else {
				user.moderator = false;
			}
			await user.save().catch(error => console.log(error));
			cachegoose.clearCache();
			return;
		}
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} toggle - chatbot_enabled
     */
	async setchatbot_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.chatbot_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
    * @param {string} guildID - ID of the User
    * @param {string} channel - chatbot channel
    */
	async setchatbot_channel(guildID, channel) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!channel) throw new Error('Please Provide a channel!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { channel };
		}
		guild.chatbot_channel = channel;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { channel };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} toggle - automeme_enabled
     */
	async setautomeme_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.automeme_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
    * @param {string} guildID - ID of the User
    * @param {string} channel - automeme channel
    */
	async setautomeme_channel(guildID, channel) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!channel) throw new Error('Please Provide a channel!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { channel };
		}
		guild.automeme_channel = channel;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { channel };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} role - mute role
    */
	async setmute_role(guildID, role) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!role) throw new Error('Please Provide a role!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { role };
		}
		guild.mute_role = role;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { role };
	},
	/**
* @param {string} guildID - ID of the User
* @param {string} toggle - snipe toggle
*/
	async setafk_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.afk_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
     * @param {string} guildID - ID of the User
     * @param {string} role - snipe role
     */
	async setafk_role(guildID, role) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!role) throw new Error('Please Provide a role!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { role };
		}
		guild.afk_role = role;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { role };
	},
	/**
	* @param {string} guildID - ID of the User
	* @param {string} toggle - premium toggle
	*/
	async premiumGuild(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		guild.premium = toggle;
		await guild.save().catch(error => console.log(error));
		cachegoose.clearCache();
		return { toggle };
	},
	/**
	* @param {string} guildID - ID of the User
	* @param {string} toggle - premium toggle
	*/
	async pushguild(user, guildID, method) {
		if (!method) return new Error('please provide a method');
		usersDB.findOne({ id: user }, async (err, data) => {
			if (err) throw err;
			if (!data) return new Error('user not found.');
			if (method === 'push') {
				await data.premiumservers.push(guildID);
				await data.save().catch(error => console.log(error));
				data.save();
			}
			if (method === 'splice') {
				const index = data.premiumservers.indexOf(guildID);
				data.premiumservers.splice(index, 1);
				data.save();
			}
			cachegoose.clearCache();
			return { user };
		});
	},
	async adddisable(id, name, type) {
		if(!name) throw new Error('name not provided!');
		if(!type) throw new Error('type not provided!');
		if(!id) throw new Error('id not provided!');

		if (type === 'category') {
			const db = await guildsDB.findOne({ id: id });
			if (!db) {
				const newdoc = await new guildsDB({ id: id });
				await newdoc.save().catch(error => console.log(error));
			}
			await db.category.push(name);
			await db.save().catch(e => console.log(e));
		}
		if (type === 'command') {
			const db = await guildsDB.findOne({ id: id });
			if (!db) {
				const newdoc = await new guildsDB({ id: id });
				await newdoc.save().catch(error => console.log(error));
			}
			await db.commands.push(name);
			await db.save().catch(e => console.log(e));
		}
		cachegoose.clearCache();
		return { name };
	},

	async removedisable(id, name, type) {
		if (!id) throw new Error('id not provided');
		if (!name) throw new Error('name not provided');
		if (!type) throw new Error('type not provided');
		if (type === 'category') {
			const db = await guildsDB.findOne({ id: id });
			if (!db) {
				return false;
			}
			const index = db.category.indexOf(name.toLowerCase());
			await db.category.splice(index, 1);
			await db.save().catch(e => console.log(e));
		}
		if (type === 'command') {
			const db = await guildsDB.findOne({ id: id });
			if (!db) {
				return false;
			}
			const index = db.commands.indexOf(name);
			await db.commands.splice(index, 1);
			await db.save().catch(e => console.log(e));
		}
		cachegoose.clearCache();
		return true;

	},
	async returnpoints(id) {
		if(!id) throw new Error('id not provided');
		const db = await pointsDB.findOne({ id: id });
		if(!db) {
			const newData = new pointsDB({
				id: id,
				points: 0,
			});
			newData.save();
			cachegoose.clearCache();
			return newData;
		}
		cachegoose.clearCache();
		return db;
	},
	async pointsleaderboard(count) {
		const leaderboard = await pointsDB.find().sort({ points: -1 }).limit(count);
		return { leaderboard };
	},
	async addpoints(user, amount) {
		if(!user) throw new Error('user not provided');
		if(!amount) throw new Error('amount not provided');
		// if(typeof amount !== Number) throw new Error('amount provided should be a number');
		const data = await pointsDB.findOne({ id: user });
		if(!data) {
			const newdata = pointsDB({
				id: user,
				points: amount,
			});
			newdata.save();
			cachegoose.clearCache();
			return true;
		}
		if(data) {
			data.points = data.points + amount;
			data.save();
			cachegoose.clearCache();
			return true;
		}
	},
	async removepoints(user, amount) {
		if(!user) throw new Error('user not provided');
		if(!amount) throw new Error('amount not provided');
		// if(typeof amount !== Number) throw new Error('amount provided should be a number');
		const data = await pointsDB.findOne({ id: user });
		if(!data) {
			const newdata = pointsDB({
				id: user,
				points: amount,
			});
			newdata.save();
			cachegoose.clearCache();
			return true;
		}
		if(data) {
			data.points = data.points - amount;
			data.save();
			cachegoose.clearCache();
			return true;
		}
	},
	async todoadd(user, thing) {
		const data = await usersDB.findOne({ id: user });
		if(data) {
			try {
				data.todo.push(thing);
				data.save();
			}
			catch (e) {
				return e;
			}
			cachegoose.clearCache();
			return true;
		}
	},
};