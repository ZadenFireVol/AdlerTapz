const LenoxCommand = require('../LenoxCommand.js');
const Discord = require('discord.js');

module.exports = class givecreditsCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'givecredits',
			group: 'staff',
			memberName: 'givecredits',
			description: 'Gives a user a certain amount of credits',
			format: 'givecredits {@USER} {count}',
			aliases: [],
			examples: ['givecredits @Monkeyyy11#0001 2000'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: [],
			shortDescription: 'Credits',
			dashboardsettings: true,
			cooldown: 300000
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		const guild = msg.client.guilds.get('332612123492483094').roles.find(r => r.name.toLowerCase() === 'moderator').id;
		if (!msg.member.roles.get(guild)) return msg.reply(lang.botownercommands_error);

		const user = msg.mentions.users.first() ? msg.mentions.users.first().id : msg.mentions.users.first() || args.slice(0, 1).join(' ');
		const amountofcoins = parseInt(args.slice(1).join(' '), 10);

		if (!user) return msg.reply(lang.givecredits_nomention);
		if (!amountofcoins) return msg.reply(lang.givecredits_novalue);

		let currentCredits = msg.client.provider.getUser(user, 'credits');
		currentCredits += amountofcoins;
		await msg.client.provider.setUser(user, 'credits', currentCredits);

		const embeddescription = lang.givecredits_embeddescription.replace('%credits', amountofcoins).replace('%user', user.tag);
		const embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL)
			.setDescription(embeddescription)
			.setTimestamp()
			.setColor('GREEN');

		await msg.client.channels.get('530079522532622396').send({
			embed
		});

		const done = lang.givecredits_done.replace('%credits', amountofcoins);
		return msg.reply(done);
	}
};