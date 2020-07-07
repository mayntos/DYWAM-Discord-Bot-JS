module.exports = 
{
    name: 'reload',
    execute(message, args)
    {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        if (!command) return message.channel.send(`There is no command with the name \`${commandName}\``);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try
        {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded.`);
        }
        catch (error)
        {
            console.log(error);
            message.channel.send(`Error encountered while reloading command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};