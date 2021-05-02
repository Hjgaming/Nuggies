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
		schemas.forEach((file) => {
			const schema = require(`../models/${file}`);
			schema.find()
				.then(data => this[file.split('.')[0]] = data)
				.catch(err => console.log('Unable to cache data:\n' + err));
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