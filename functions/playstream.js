/* eslint-disable no-unused-vars */
async function play(message, toPlay) {
	if (!toPlay) {
		if (message.guild.me.voice.channel) message.guild.me.voice.channel.leave();
		if (message.client.soundboardqueue.get(message.guild.id)) message.client.soundboardqueue.delete(message.guild.id);
		return;
	}
	let connection = message.guild.me.voice.connection;
	if (!connection) connection = await message.member.voice.channel.join();

	let queue = message.client.soundboardqueue.get(message.guild.id);
	if (!queue) queue = message.client.soundboardqueue.set(message.guild.id, []);

	if (!queue[0]) {
		const dispatcher = connection.play(toPlay, { seek: 0, volume: 0.5 });

		dispatcher.on('speaking', speaking => {
			if (!speaking) {
				message.client.soundboardqueue.get(message.guild.id).shift();
				setTimeout(() => {
					if (message.client.soundboardqueue.get(message.guild.id).length == 0) {
						return message.guild.me.voice.channel.leave();
					}
					play(message, queue[0]);
				}, 1000);
			}
		});
	}
	else if (queue[0]) {
		message.client.soundboardqueue.get(message.guild.id).unshift({
			player: connection.dispatcher,
			toPlay: toPlay,
		});
		play(message, queue[0]);
	}
}
module.exports = play;