const LenoxCommand = require('../LenoxCommand.js');
const Discord = require('discord.js');

module.exports = class creditsCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'credits',
			group: 'currency',
			memberName: 'credits',
			description: 'Shows you the credits of you or another user',
			format: 'credits [@USER]',
			aliases: ['balance', 'c'],
			examples: ['credits', 'credits @Monkeyyy11#7584'],
			clientpermissions: ['SEND_MESSAGES'],
			userpermissions: [],
			shortDescription: 'Credits',
			dashboardsettings: false
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		let user1 = msg.mentions.users.first();
		const prefix = msg.client.provider.getGuild(msg.guild.id, 'prefix');

		// eslint-disable-next-line no-negated-condition
		if (!user1) {
			// eslint-disable-next-line no-negated-condition
			if (args.length !== 0) {
				try {
					user1 = msg.client.users.get(args.join(' '));
				} catch (error) {
					user1 = msg.author;
				}
			} else {
				user1 = msg.author;
			}
		}

		if (msg.client.provider.getUser(msg.author.id, 'creditsmessage') === false) {
			const hintembed = lang.credits_hintembed.replace('%prefix', prefix);
			const embed = new Discord.MessageEmbed()
				.setColor('#3399ff')
				.setDescription(hintembed)
				.setAuthor(lang.credits_hint);

			await msg.client.provider.setUser(msg.author.id, 'creditsmessage', true);

			msg.author.send({
				embed
			});
		}

		/* let userArray = [];
		const tempArray = [];
		let globalrank;
		await msg.client.provider.getDatabase().collection('userSettings').find()
			.forEach(row => {
				if (!isNaN(row.settings.credits)) {
					const member = msg.client.users.get(row.userId);
					const settings = {
						userId: row.userId,
						user: member ? member.tag : row.userId,
						credits: Number(row.settings.credits)
					};
					if (settings.userId !== 'global') {
						userArray.push(settings);
					}
				}
			});

		userArray = userArray.sort((a, b) => {
			if (a.credits < b.credits) {
				return 1;
			}
			if (a.credits > b.credits) {
				return -1;
			}
			return 0;
		});

		for (let i = 0; i < userArray.length; i++) {
			tempArray.push((i + 1));
		}

		for (let index = 0; index < userArray.length; index++) {
			if (userArray[index].userId === user1.id) {
				globalrank = tempArray[index];
			}
		}*/

		const embed = new Discord.MessageEmbed()
			.setAuthor(`${user1.tag}`, user1.avatarURL())
			.setDescription(`**${lang.credits_credits}** ${msg.client.provider.getUser(user1.id, 'credits')} 💸`)
			.setColor('GREEN');

		msg.channel.send({
			embed
		});
	}
};
