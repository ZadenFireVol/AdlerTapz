const LenoxCommand = require('../LenoxCommand.js');
const Discord = require('discord.js');
const settings = require('../../settings.json');

module.exports = class languagefinderCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'languagefinder',
			group: 'staff',
			memberName: 'languagefinder',
			description: 'Allows the staffs of the bot to find out the language of a Discord server',
			format: 'languagefinder {guildid}',
			aliases: [],
			examples: ['languagefinder 352896116812939264'],
			clientpermissions: ['SEND_MESSAGES'],
			userpermissions: [],
			shortDescription: 'General',
			dashboardsettings: true
		});
	}

	run(msg) {
		const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		const role = msg.client.guilds.get(settings.botMainDiscordServer).roles.find(r => r.name.toLowerCase() === 'moderator');
		if (!role || !msg.member.roles.has(role.id)) return msg.reply(lang.botownercommands_error);

		const content = args.slice().join(' ');
		if (!content || isNaN(content)) return msg.reply(lang.languagefinder_noguildid);

		if (!msg.client.provider.getGuild(msg.guild.id, 'language')) return msg.channel.send(lang.languagefinder_nofetch);

		const guildload = msg.client.guilds.get(content);
		const requestedby = lang.languagefinder_requestedby.replace('%authortag', msg.author.tag);
		const embed = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setThumbnail(guildload.iconURL())
			.addField(lang.languagefinder_embedfield1, `${guildload.owner.user.tag} (${guildload.owner.id})`)
			.addField(lang.languagefinder_embedfield2, msg.client.provider.getGuild(msg.guild.id, 'language').toUpperCase())
			.setFooter(requestedby)
			.setAuthor(`${guildload.name} (${guildload.id})`);

		return msg.client.channels.get('497395598182318100').send({ embed: embed });
	}
};
