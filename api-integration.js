const { Bot, session } = require('grammy')
const axios = require('axios')
const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ')

async function getWeather(city) {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=d432aec7286e403ca2d110051242811&q=${city}`)
        const data = response.data

        // Ma'lumotlarni obyektdan ajratib olish
        const location = data.location.name; // Shahar nomi
        const region = data.location.region; // Hudud
        const country = data.location.country; // Davlat
        const temp = data.current.temp_c; // Harorat (Celsius)
        const condition = data.current.condition.text; // Ob-havo tavsifi
        const windSpeed = data.current.wind_kph; // Shamol tezligi (km/h)
        const humidity = data.current.humidity; // Namlik (%)
        const icon = `https:${data.current.condition.icon}`;

        return { message: `📍 Joylashuv: ${location}, ${region}, ${country}
🌡 Harorat: ${temp}°C
🌤 Ob-havo: ${condition}
💧 Namlik: ${humidity}%
🌬 Shamol tezligi: ${windSpeed} km/soat`, photo: icon
    };
    } catch (e) {
        console.log(e)
    }
}

bot.command('start', async (ctx) => {
    await ctx.reply('Hello weather, send me city name!')
})

bot.on('message:text', async (ctx) => {
    const weather = await getWeather(ctx.message.text)
    if (!weather) {
        await ctx.reply('[404] City not found')
    } else {
        await ctx.replyWithPhoto(weather.photo, { caption: weather.message })
    }
})

bot.start()