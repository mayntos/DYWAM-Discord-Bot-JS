module.exports = 
{
    name: 'kick',
    args: true,
    usage: '<user> <reason>',
    cooldown: 5,
    execute(message, args)
    {
        if(!message.mentions.users.size) {return message.reply('a user must be tagged in order to kick.');}

        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username} for ${args[1]}`);
    },
};