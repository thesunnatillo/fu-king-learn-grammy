const { Bot } = require("grammy");
const { Router } = require("@grammyjs/router");

const bot = new Bot("7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ");

// Router yaratish
const router = new Router((ctx) => ctx.message?.text);

// Router marshrutlarini sozlash
router.route("/start", async (ctx) => {
    await ctx.reply("Xush kelibsiz! Bu start buyruqidir.");
});

router.route("/help", async (ctx) => {
    await ctx.reply("Bu yordam bo'limi.");
});

// Routerni botga ulash
bot.use(router);

// Boshqa umumiy buyruq
bot.on("message:text", async (ctx) => {
    await ctx.reply("Noma'lum buyruq.");
});

// Botni ishga tushirish
bot.start();
