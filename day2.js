// Media fillar yuborish va qabul qilish

const { Bot } = require('grammy');
const fs = require("fs");
const axios = require("axios");
const { join } = require('path')

const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ')

bot.command('start', (ctx) => {
    ctx.reply('Hello, I am grammY bot')
})

bot.on('message:photo', async (ctx) => {
    await ctx.replyWithPhoto(ctx.msg.photo[0].file_id)
})

bot.on('message:document', async (ctx) => {
    await ctx.replyWithDocument(ctx.msg.document.file_id)
})

bot.hears('dream', async (ctx) => {
    const file_path = "C:\\projects\\grammY\\uploads\\Screenshot 2024-11-22 221000.png"
    await ctx.reply({ source: file_path })
})

bot.start()