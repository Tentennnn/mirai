const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const Schema = require(`${process.cwd()}/structures/models/welcomeSchema`);

module.exports = {
  name: 'set-WelBackgroud',
  aliases: [],
  usage: '',
  description: '',
  category: "setup",
  cooldown: 0,
  userPermissions: "ADMINISTRATOR",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee, prefix) {
    try {

      Schema.findOne({
        Guild: message.guild.id
      }, async (err, data) => {
        if (data) {
          data.Welbg = Welbg;
          data.save();
        } else {
          new Schema({
            Guild: message.guild.id,
            Welbg: Welbg,
          }).save();
        }
        message.reply({ embeds:[new MessageEmbed()
          .setTitle(`${client.allEmojis.y} Welcome System`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`**Welcome Background set:** \`${Welbg}\``)]});
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);
      return errorLogsChannel.send({
        embeds: [new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.x} Got a Error:`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setFooter(`Having: ${message.guild.memberCount} Users`)
        ]
      })
    }
  }
}