const { RichEmbed } = require("discord.js");
const Errors = require('../../utils/errors');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config: {
        name: 'pussy',
        aliases: [''],
        category: 'anime',
        description: 'Posts a random pussy picture. Warning this commands for 18+',
        usage: '',
        example: '',
        accessableby: 'Members'
    },
    run: async (bot, message, args) => {
        if (!message.channel.nsfw) return Errors.NSFW(message);
        
        neko.nsfw.pussy().then(pussy => {
            const embed = new RichEmbed()
                .setColor(message.guild.me.displayColor)
                .setImage(pussy.url)
                .setFooter('Powered by nekos.life')
                .setTimestamp();
            message.channel.send(embed);
        })
    }
}