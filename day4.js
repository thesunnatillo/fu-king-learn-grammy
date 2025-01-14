const { Bot, session } = require('grammy')
const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ')

bot.command('start', async (ctx, next) => {
    await ctx.reply('salom')
    await next()
})

bot.hears('salom',async (ctx) => {
    await ctx.reply('Global middleware')
})

bot.start()