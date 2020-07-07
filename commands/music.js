const ytdl = require('ytdl-core');
const Queue = require('../QueueClass.js');
const songQueue = new Queue(20);

let connection;
let dispatcher;

function playSong(msg)
{
    if(songQueue.peek() === null)
    {
        return msg.channel.send('Song Queue is empty. Could not \`play\`.');
    }

    const song = songQueue.dequeue();
    dispatcher = connection.play(ytdl(song.link, { quality: 'lowestaudio', filter: 'audioonly' }));

    dispatcher.on('start', () => {
        const songEmbed = generateSongEmbed(song.title, song.link, song.artist);
        msg.channel.send({ embed: songEmbed });
        console.log(`${song.title} is now playing.`);
    });

    dispatcher.on('finish', () => {
        console.log(`${song.title} has finished playing.`);

        if(songQueue.peek() != null) {playSong(msg);}
    });
}

function generateSongListEmbed()
{   
    let songList = '';
    let artistList = '';
    for(let i = 0; i < songQueue.container.length; i++)
    {
        songList += `*${songQueue.container[i].title}*\n`;
        artistList += `*${songQueue.container[i].artist}*\n`;
    }

    const songsEmbed = 
    {
        title: 'Music Queue',
        color: '#189ebb',
        fields:
        [
            {
                name: ':musical_score:  Song',
                value: songList,
                inline: true,
            },
            {
                name: ':microphone:  Channel',
                value: artistList,
                inline: true,
            },
        ],
        timestamp: new Date(),
    };
    return songsEmbed;

}

function generateSongEmbed(songTitle, songUrl, songArtist)
{
    const songEmbed = 
    {
        title: ':loudspeaker:  Currently Playing',
        color: '#ff0000',
        description: songTitle,
        url: songUrl,
        author: 
        {
            name: songArtist,
        },
        timestamp: new Date(),
    };
    return songEmbed;
}

module.exports =
{
    name: 'music',
    args: true,
    usage: '<queue {songLink}, play, skip>',
    async execute(message, args)
    {
        switch(args[0])
        {

            case 'queue':
                {
                    ytdl.getInfo(args[1], function(err, info) {
                        const songObject = { link: args[1], title: info.title, artist: info.author.name };
                        songQueue.enqueue(songObject);
                        const outMsg = generateSongListEmbed();
                        message.channel.send({ embed: outMsg });
                    });
                    break;
                }
            case 'play':
                {
                    if(!message.member.voice.channel)
                    {
                        return message.channel.send('User must be in Voice Channel to use \`!music play\`');
                    }

                    connection = await message.member.voice.channel.join();

                    playSong(message);
                    break;
                }
            case 'skip':
                {
                    playSong(message);
                    break;
                }
            default:
                break;
        }
    },
};