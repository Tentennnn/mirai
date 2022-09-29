const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'get-invite',
    aliases: ["ginvite"],
    usage: '',
    description: '',
    category: "ownerOnly",
    cooldown: 0,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: true,
    toggleOff: false,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args, ee, prefix) {
  let sv = client.guilds.cache.get(args[0]);
        if (!sv) return message.channel.send(`Enter a valid guild id`);
        sv.channels.cache
          .random()
          .createInvite()
          .then(a => message.author.send(a.toString()));
    
        client.on("guildCreate", guild => {
          let guildCreate = new RichEmbed()
            .setColor(`PRUPLE`)
            .addField("Someone added my bot, server name:", guild.name)
            .addField("And their id was:", guild.owner.id)
            .addField("With guild ID: ", guild.id);
    
        client.users
            .get("356510829920780289", "833658720109461514")
            .send(guildCreate)
            .catch(err => {
              if (err)
                return message.channel.send(
                  `Well.... the ban didn't work out. Here's the error ${err}`
                );
            });
        });

   }
}