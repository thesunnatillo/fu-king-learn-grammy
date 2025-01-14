const { Bot, Keyboard, InlineKeyboard} = require('grammy')
const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ')

bot.command('start', async (ctx) => {
    await ctx.reply('Hi, I am bot')
})

bot.command('goo', async (ctx) => {
    const buttons = new Keyboard().text('Salom').row().text('Xayr').resized()
    await ctx.reply('Translate =>', { reply_markup: buttons })
})

bot.hears(['Salom', 'Xayr'], async (ctx) => {

    const inlineBtn = new InlineKeyboard().text('Correct', 'correct').text('Mistake', 'mistake')

    if (ctx.msg.text === 'Salom') {
        await ctx.reply('Hello', { reply_markup: inlineBtn })
    } else if (ctx.msg.text === 'Xayr') {
        await ctx.reply('Bye', { reply_markup: inlineBtn })
    }
})

bot.callbackQuery(['correct', 'mistake'], async (ctx) => {
    if (ctx.callbackQuery.data === 'correct') {
        await ctx.reply('Yes, I know')
    } else if (ctx.callbackQuery.data === 'mistake') {
        await ctx.reply('No, I know this is correct')
    }
})

bot.start()