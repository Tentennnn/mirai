require('dotenv').config();
const config = require('./structures/botconfig/config.json');
const ee = require('./structures/botconfig/embed.json');
const {
  Client,
  Intents,
} = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");

const client = new Client({
  fetchAllMembers: false,
  const mySecret = process.env['MongoDB_TOKEN'],
  shards: 'auto',
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    //Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activities: [{
      name: `${process.env.PREFIX}help | tenbot.xyz`,
      type: "PLAYING",
    }],
    status: "online"
  }
});

//--------discordbotlist.com

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.topggToken, { webhookPort: 8080, webhookAuth: process.env.topggKey, webhookServer: server });

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
  console.log(`Oops! ${e}`);
})

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});


server.listen(process.env.PORT, () => {
  console.log('Listening');
  console.log(process.env.PORT)
});

//---------------------

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;



["extraEvents", "clientVariables", "antiCrash", "eventHandler", "commandHandler", "slashCommandHandler", "loadEnmapDB", "mongoDBHandler", "loadModules"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
