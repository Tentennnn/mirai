const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'servers-list',
  aliases: ["s-list"],
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
    await message.delete();
    var footertext = [`🔹`, `💠`, `🔸`, `🔲`, `▪`, `🎉`, `➡️`];
    var rand = Math.floor(Math.random() * footertext.length);
    var randomstar = footertext[rand];
    // Lets define our array of guilds
    const guildArray = client.guilds.cache.map((guild) => {
      return `${randomstar} ${guild.name} == ${guild.id}`
    })
    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`\`\`\`${guildArray.join('\n')}\`\`\``)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
              ]})
                                          
  }
}