/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../../utils/config.json');

module.exports.run = async (client, message, args, utils) => {

	const { getChart } = require('billboard-top-100');
	const pronouns = ['silly', 'mommy', 'dad', 'mom', 'master', 'nii-san', 'onee-san', 'love', 'ma\'am', 'sir', 'friend', 'b-baka', 'honey'];
	const randompronoun = pronouns[Math.floor(Math.random() * (pronouns.length - 1 + 1) + 1)];

	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	getChart('hot-100', today, (err, chart) => {
		if (err) {
			message.channel.send(`${randompronoun}, there was an error 😔`);
			return console.log(err);
		}
		const songs = chart.songs;
		const embed = new Discord.MessageEmbed()
			.setTitle('Top Songs This Week')
			.setURL('https://www.billboard.com/charts/hot-100')
			.setThumbnail(songs[0].cover)
			.setImage('https://i.pinimg.com/originals/be/8c/62/be8c6259978dfcfb15a079fd29c966a0.jpg')
			.setFooter('Top Songs from Billboard', 'https://i.pinimg.com/originals/be/8c/62/be8c6259978dfcfb15a079fd29c966a0.jpg');
		songs.splice(24, 75);
		function addsongs(ok) {
			try {
				embed.addField(`${ok.rank}. ${ok.title}`, `By ${ok.artist}`);
			}
			catch (error) {
				message.channel.send(`${randompronoun}, there was an error 😔`);
				return console.log(err);
			}
		}
		songs.some(addsongs);
		message.channel.send(embed);
	});

};


module.exports.help = {
	aliases: [],
	name: 'hot100',
	description: 'See top songs from billboard',
	usage: config.prefix + 'hot100',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};