const { RichEmbed } = require("discord.js");
const Errors = require('../../utils/errors');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config: {
        name: 'cuddle',
        aliases: [''],
        category: 'anime',
        description: 'Give a cuddle to someone.',
        usage: '<mention>',
        example: '@hnxtasia',
        accessableby: 'Members'
    },
    run: async (bot, message, args) => {
        let member = message.mentions.users.array()[0];
        if (!member) return Errors.noUser(message, 'cuddle');
        
        else if (member === message.author) {
            return Errors.noUser2(message, 'cuddle');
        }
        
        neko.sfw.cuddle().then(cuddle => {
            let embed = new RichEmbed()
                .setColor(message.guild.me.displayColor)
                .setDescription(`${member} You got a cuddle from ${message.author.username}`)
                .setImage(cuddle.url)
                .setFooter('Powered by nekos.life')
                .setTimestamp();
            message.channel.send(embed);
        })
    }
}