/* eslint-disable no-unused-vars */
function clean(text) {
	if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); }
	else { return text; }
}

module.exports.run = async (client, message, args, utils, data) => {
	args = args.join(' ');
	try {
		let evaled;
		if (args.includes('await')) evaled = eval('(async () => {' + args + '})()');
		else evaled = eval(args);
		if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }
		message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};

module.exports.help = {
	aliases: [],
	name: 'eval',
	description: 'Just eval 🤷‍♂️',
	usage: 'eval',
};

module.exports.config = {
	developers: true,
	args: true,
	category: 'Owner',
	disable: false,
	cooldown: 0,
};
