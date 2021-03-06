const { Access } = require('../../utils/settings');
const Errors = require('../../utils/errors');

module.exports = {
    config: {
        name: 'restart',
        aliases: ['reboot'],
        category: 'owner',
        description: 'Restart the bot!',
        usage: '',
        example: '',
        accessableby: 'Owner'
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };

        if(message.author.id !== Access.OWNERS) return Errors.OWNER(message);

        try{
            await message.channel.send('Restarting...');
            process.exit(42);
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }
}