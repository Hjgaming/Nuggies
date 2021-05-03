const fs = require('fs');

class Cache {
	/**
	 * @param {Number} time
	 * @description The amount of interval between each request to database
	 */
	constructor(time) {
		this.time = time || null;
		this.cache();
		if (this.time) {
			this.request(this.time);
		}
	}

	async cache() {
		const schemas = fs.readdirSync('models/');
		schemas.forEach(async (file, i) => {
			const schema = require(`../models/${file}`);
			schema.find()
				.then(data => {
					const name = file.split('.')[0];
					this[name] = new Map();
					if(data[0].id) data.forEach((d) => this[name].set(d.id, d));
					else if(name.toLowerCase() == 'muteroleschema') data.forEach((d) => this[name].set(d.GuildID, d));
					else if(name.toLowerCase() == 'warningschema') data.forEach((d) => this[name].set(d.UserID, d));
				})
				.catch(err => console.log('Unable to cache data:\n' + err));
			if(i == schemas.length) this.cached = true;
		});
	}

	async request() {
		if (this.time) {
			setTimeout(() => {
				this.cache();
				this.request();
			}, this.time);
		}
	}
}
module.exports = Cache;