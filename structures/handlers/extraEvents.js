const {
  MessageEmbed
} = require('discord.js');
const moment = require("moment");
const config = require("../botconfig/config.json");
const filters = require("../botconfig/filters.json");
const {
    DisTube
} = require("distube");
const {
    SpotifyPlugin
} = require("@distube/spotify");
const {
    SoundCloudPlugin
} = require("@distube/soundcloud");
const {
  join
} = require("path");
const {
  registerFont
} = require("canvas");

module.exports = async (client) => {

  // Console Logger
  client.logger = (data) => {
    // if (!settings[`debug-logs`]) return;
    let logstring = `${String(`DECODERS`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` 〢 `.magenta}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };


// Distube   
client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    //emitAddListWhenCreatingQueue: false,
    searchSongs: 0,
    youtubeCookie: `VISITOR_INFO1_LIVE=5sVv6DVatkc; PREF=tz=Asia.Bangkok; SID=_gcVTPLkNVazpkVli69BchUhanByLwufnrjHuWksTVTXYDa3bPy2oDM_OtWFgQobNz1dIw.; __Secure-3PSID=_gcVTPLkNVazpkVli69BchUhanByLwufnrjHuWksTVTXYDa3fxSwT_A6VEQ800BtfIqY3g.; HSID=AtEcYaY0p84h6Oe0T; SSID=Aw1eXUZzXwRsNKL79; APISID=tC4NkTP4aSBeXrF6/ALKjiUoKBog4QaEZ8; SAPISID=LSCNGO7sydnYZ031/A06QZRbat62axLIt7; __Secure-3PAPISID=LSCNGO7sydnYZ031/A06QZRbat62axLIt7; LOGIN_INFO=AFmmF2swRgIhAP8CKeTu5RwOI-V2daJX0u0mDqkqqffGHsctbONm_-HLAiEAh0QJFPLUgpp5Tka6xxoNymTCwUyKSeDFjcsTbybrDfQ:QUQ3MjNmejBRQURDZG1VSW1uczJZdWlXUWpyeElQX0lNc3hFZlBIWFpYSFpXYUhSSkZPTS1fWjU0c0JxXzVTYzJlUHluRVNpdHV5ei1sajNMbVg4THRSUWUtZkN2QTZuNGZjS1dyUTVHWHRGZ05zbk9objVZMWJjc1VyNjgxVzRqX0Zic1c3V2J4bkJKLXNSUmRLUWJ6RG1vbkFVSU5WeENB; SIDCC=AJi4QfH00kyvwLXd4uWFDkrGVuDyRMkiBi8JbCUac9GPkL9GYeLETFaXKZkn9XDh--qbsuDb; __Secure-3PSIDCC=AJi4QfEEbwp3-Pni8HBMNWyeuPGQeumaNjrpxFjyv97_WeXu4G_XrXbAu8TahLE50XdzcLoveg; YSC=gniWHlJprSo`,
    nsfw: true,
    emptyCooldown: 25,
    ytdlOptions: {
        //requestOptions: {
        //  agent //ONLY USE ONE IF YOU KNOW WHAT YOU DO!
        //},
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 64,
    },
    youtubeDL: false,
    updateYouTubeDL: false,
    customFilters: filters,
    plugins: [
        new SpotifyPlugin({
          parallel: true,
          emitEventsAfterFetching: true,
          api: {
            clientId: process.env.spotify_clientID,
            clientSecret: process.env.spotify_clientSecret,
          },
        }),
        new SoundCloudPlugin()
    ]
});
    
  
    client.on("voiceStateUpdate", (oldState, newState) => {
      try{
        //skip if not the bot
        if(client.user.id != newState.id) return;
        if (
            (!oldState.streaming && newState.streaming)   ||
            (oldState.streaming && !newState.streaming)   ||
            (!oldState.serverDeaf && newState.serverDeaf) ||
            (oldState.serverDeaf && !newState.serverDeaf) ||
            (!oldState.serverMute && newState.serverMute) ||
            (oldState.serverMute && !newState.serverMute) || 
            (!oldState.selfDeaf && newState.selfDeaf)     ||
            (oldState.selfDeaf && !newState.selfDeaf)     ||
            (!oldState.selfMute && newState.selfMute)     ||
            (oldState.selfMute && !newState.selfMute)     ||
            (!oldState.selfVideo && newState.selfVideo)   ||
            (oldState.selfVideo && !newState.selfVideo) 
         )
        if ((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId)) {
            try{ newState.setDeaf(true);  }catch{ }
            return;
        }
      }catch{

      }
    
  });
  //ANTI UNMUTE THING
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false){
      try{
        newState.setDeaf(true).catch(() => {});
      } catch (e){
        //console.log(e)
      }
    }
  });

  // Registering Canvas Font 
  registerFont(join(__dirname, "../fonts", "impact.ttf"), {
    family: "Impact"
  });

}
