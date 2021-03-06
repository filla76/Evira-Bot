const { RichEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const { Colors } = require('../../utils/settings');
const Errors = require('../../utils/errors');
const moment = require('moment');

module.exports = {
    config: {
        name: 'unban',
        aliases: ['uban'],
        category: 'moderation',
        description: 'Unbans the specified user!',
        usage: '<user> <reason>',
        example: '@Ryevi This account can join',
        accessableby: 'Moderators'
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };

        if(!message.member.hasPermission(['ADMINISTRATOR'])) 
            return Errors.noPerms(message, 'ADMINISTRATOR');

        let bannedMember = await bot.fetchUser(args[0]);
        if(!bannedMember) return message.channel.send('Please provide a user id to unban someone!');
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'You must specify a reason for the ban!';
    
        if(!message.guild.me.hasPermission(['ADMINISTRATOR'])) 
            return Errors.botPerms(message, 'ADMINISTRATOR');
    
        message.delete();
        try {
            message.guild.unban(bannedMember, {reason: reason});
            message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`);
        } catch(e) {
            console.log(e.message);
        }
    
        let embed = new RichEmbed()
            .setColor(Colors.GREEN)
            .setAuthor('Unbanned Member', bannedMember.user.displayAvatarURL)
            .setDescription(stripIndents`**Unbanned By:** ${message.author.tag} (${message.author.id})
            **Unbanned User:** ${bannedMember.user.tag} (${bannedMember.user.id})
            **Reason:** ${reason}
            **Date & Time:** ${moment(message.createdAt).format('ddd, MMMM DD, YYYY HH:mm')}`)
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setTimestamp();
    
        let sChannel = message.guild.channels.find(c => c.name === 'incident-log');
        sChannel.send(embed);
    }
}