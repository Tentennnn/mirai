const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
    MessageEmbed
} = require('discord.js');
const Discord = require("discord.js");
const DBL = require("dblapi.js");


module.exports = async (client) => {
   
			const stats = new DBL(process.env.apikey.Topgg, client);
			setInterval(function(){
				stats.postStats(client.guilds.cache.size);
			}, 60000*10); // every 10 minutes

};