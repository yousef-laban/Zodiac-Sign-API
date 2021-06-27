var unirest = require("unirest");
const prompt = require("prompt-sync")({ sigint: true });
const Discord = require("discord.js");

var req = unirest("POST", "https://sameer-kumar-aztro-v1.p.rapidapi.com/");

const horoscopes = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

let sign, day, statuse, result;

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (
    msg.content.toLowerCase() === "hi Zodiac".toLowerCase() ||
    msg.content.toLowerCase() === "hello Zodiac".toLowerCase()
  ) {
    msg.reply(
      `Hello my name is Zodiac 🧙 , I'm an expert astrologist, if you are here that's mean that you are curious  about your day, to know more  please Enter your horoscope ?`
    );
  }

  horoscopes.forEach((horo) => {
    if (horo.toLowerCase() === msg.content.toLowerCase()) statuse = true;
  });

  if (statuse) {
    sign = msg.content;
    msg.reply(
      "which day you are interesting to know it's secrets (yesterday , today , tomorrow) ? "
    );
    statuse = false;
  }

  if (
    msg.content.toLowerCase() === "today".toLowerCase() ||
    msg.content.toLowerCase() === "yesterday".toLowerCase() ||
    msg.content.toLowerCase() === "tomorrow".toLowerCase()
  ) {
    day = msg.content;
  }

  if (sign && day) {
    req.query({
      sign: sign,
      day: day,
    });

    req.headers({
      "x-rapidapi-key": "21f7e36f16msh22f8097c79d1d84p1f10d6jsna38768bf8512",
      "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      result = Object.keys(res.body).map((key) => `${key} : ${res.body[key]}`);

      msg.channel.send(
        `hmmm intresting  your born between ${res.body.date_range} , so for ${res.body.current_date} : `
      );

      msg.channel.send(`${res.body.description}`);

      msg.channel.send(
        ` your best friend for today will be "${res.body.compatibility}" so keep them close.`
      );

      msg.channel.send(`Your general mood will be "${res.body.mood}".`);

      msg.channel.send(
        `Today wear ${res.body.color} , and if you had to choose allways choose this number ${res.body.lucky_number}.`
      );

      msg.channel.send(
        "Thank you for trusting me, if you need more help you know where you can find me "
      );
      sign = "";
      day = "";
    });
  }
});

client.login("ODU3NTM0MDc0NjQ2MTY3NTUy.YNQ-1w.YvQ_yuXWyjsvzy0g3ccg2b49kMs");
