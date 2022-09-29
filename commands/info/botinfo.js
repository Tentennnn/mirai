const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  version
} = require('discord.js');
const moment = require("moment");
let os = require('os')
let cpuStat = require("cpu-stat")

module.exports = {
  name: "botinfo",
  aliases: ["botstats"],
  usage: '',
  description: "Sends detailed info about the client",
  category: "info",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {

      let cpuLol;
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map(guild => guild)
        for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;

        }

        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setTitle("__**Stats:**__")
          .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
          .addField("⌚️ Uptime ", `\`${duration}\``, true)
          //.addField("\u200b", `\u200b`, true)

          .addField("📁 Users", `\`${client.users.cache.size}\``, true)
          .addField("📁 Servers", `\`${client.guilds.cache.size}\``, true)
         // .addField("\u200b", `\u200b`, true)


          .addField("📁 Voice-Channels", `\`${client.channels.cache.filter(ch => ch.type === "voice").size}\``, true)
          .addField("📁 Connected Channels", `\`${connectedchannelsamount}\``, true)
         // .addField("\u200b", `\u200b`, true)

          .addField("👾 Discord.js", `\`v${version}\``, true)
          .addField("🤖 Node", `\`${process.version}\``, true)
          .addField("\u200b", `\u200b`, true)

          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)

          .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Arch", `\`${os.arch()}\``, true)
         // .addField("\u200b", `\u200b`, true)

          .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
          .addField("📡 API Latency", `\`${(client.ws.ping)}ms\``, true)
          
          .addField("👥 Made By", `[TEN Devolopment](https://tenbot.xyz/)`, true)
        return message.channel.send({ embeds: [embed] });


      });
    } catch (e) {
      console.log(e)
    }
  },
};