const { Bot, session } = require('grammy')
const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ')

function initialSession() {
    return { step: "", name: "", age: "" }
}

bot.use(session( { initial: initialSession }))

bot.command('start', async (ctx) => {
    ctx.session.step = "name"
    await ctx.reply('Salom, Ismingizni kiriting keyin yoshingizni!');
})

bot.command('cancel', (ctx) => {
    ctx.session = initialSession()
    ctx.reply("Statedan chiqarildi")
    console.log(ctx.session)
})

bot.on('message', async (ctx) => {
    const step = ctx.session.step

    if (step === "name") {
        ctx.session.name = ctx.msg.text
        ctx.session.step = "age"
        await ctx.reply(`Rahmat ${ctx.msg.text}, endi yoshingizni kiriting!`);
    } else if (step === 'age') {
        ctx.session.age = ctx.msg.text
        ctx.session.step = "complete"
        await ctx.reply(`Ism: ${ctx.session.name}\nYosh: ${ctx.session.age}`);
    } else {
        await ctx.reply("Siz allaqachon ma'lumotlarni kiritgansiz. Yangi ma'lumot uchun /start ni bosing.");
    }
})

bot.start()