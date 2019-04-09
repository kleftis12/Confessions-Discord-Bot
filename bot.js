const { Client, RichEmbed } = require('discord.js');
const bot = new Client({ disableEveryone: true });
const settings = require('./settings.json');

let embed = new RichEmbed();

bot.on('ready', () => {
    console.log(`Connected to Discord! Invite me here : https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`);
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'Confessions',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/monstercat'
        }
    });

    bot.on('message', async msg => {
        if (msg.channel.id !== settings.channelid) return;
        if (msg.author.bot) return;

        msg.delete();

        embed = new RichEmbed();
        embed.setColor(16712480);
        embed.setTitle(msg.content);
        embed.setDescription('These confessions are completely anonymous and no record is kept');
        msg.channel.send(embed);
    });
});

bot.on('error', err => {
    if (err.msg === 'ECONNRESET' || err.msg === 'ERROR' || !err.msg) return;
    console.log(err);
});

bot.login(settings.token);
