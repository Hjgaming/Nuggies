/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = async (client) => {

	console.log(`${client.user.username} is now online!`);
	client.user.setActivity(`to ${client.guilds.cache.size} guilds!`, { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
};