module.exports = 
{
    name: 'args-info',
    args: true,
    execute(message, args)
    {
        if (args[0] === 'foo')
        {
            return message.channel.send('bar');
        }

        message.channel.send(`Command name: ${this.name}\nArguments: ${args}`);
    },
};