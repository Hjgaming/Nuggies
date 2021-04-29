const Nuggies = require('../../../utils/Nuggies');
const fs = require('fs');
const ascii = require('ascii-table');

class EventHandler {

	/**
	 * @param {Nuggies} client
	 */

	constructor(client) {
		this.client = client;

		// Event handler
		const eventFiles = fs.readdirSync('./src/events/').filter((file) => file.endsWith('.js'));
		console.log(`Loading a total of ${eventFiles.length} events.`);

		this.eventtable = new ascii('Event\'s');
		this.eventtable.setHeading('Event', 'Load status');

		eventFiles.forEach((event) => {
			this.load(event);
		});

		console.log(this.eventtable.toString());
	}

	/**
	 * @param {String} eventName
	 */
	async load(eventName) {
		const event = require(`../../events/${eventName}`);
		const name = eventName.split('.')[0];

		this.eventtable.addRow(name, '✔');
		this.client.on(name, event.bind(null, this.client));
	}
}
module.exports = EventHandler;