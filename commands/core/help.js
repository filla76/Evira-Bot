const { RichEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { Client } = require('../../utils/settings');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: 'help',
        aliases: ['h', 'halp', 'commands'],
        category: 'core',
        description: 'Displays all commands that the bot has.',
        usage: '[command | alias]',
        example: 'ping',
        accessableby: 'Members'
    },
    run: async (bot, message, args) => {
        const roleColor = message.guild.me.highestRole.hexColor;
        
        const embed = new RichEmbed()
            .setColor(roleColor === '#000000' ? '#ffffff' : roleColor)
            .setAuthor(`${message.guild.me.displayName} Help Command`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL);

        if(!args[0]) {
            const categories = readdirSync('./commands/');

            embed.setDescription(`${message.guild.me.displayName} is designed and maintained for use in the ${message.guild.name} discord. The bot prefix is: **${Client.PREFIX}**`);
            embed.setFooter(`©2020 ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(`**❯ ${capitalise} [${dir.size}]:**`, dir.map(c => `\`${c.config.name}\``).join(', '));
                } catch(e) {
                    console.log(e);
                };
            });

            return message.channel.send(embed);
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${Client.PREFIX}help\` for the list of the commands.`));
            command = command.config;

            embed.setDescription(stripIndents`**Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None.'}
            **Description:** ${command.description || 'No Description provided.'}
            **Category:** ${command.category.slice(0, 1).toUpperCase() + command.category.slice(1)}
            **Usage:** ${command.usage ? `\`${Client.PREFIX}${command.name} ${command.usage}\`` : `\`${Client.PREFIX}${command.name}\``}
            **Example:** ${command.example ? `\`${Client.PREFIX}${command.name} ${command.example}\`` : 'None.'}
            **Accessible by:** ${command.accessableby || 'Members'}`);
            embed.setFooter(`Syntax: <> = required, [] = optional`);

            return message.channel.send(embed);
        }
    }
}