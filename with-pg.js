const { Bot } = require('grammy')
const { Pool } = require('pg')
const bot = new Bot('7519427254:AAEsKNcAmcrVZqiGkwSIDAQFwtMkX4RihRQ');

// PostgreSQL ulanishi
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: "postgres",
    password: '7582',
    database: 'grammy',
});

async function createTable() {
    try {
        const query = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
        await pool.query(query)
        return 'Table yaratildi!'
    } catch (e) {
        console.log(e)
        return 'Table allaqochon yaratilgan!'
    }
}

async function createUser(name) {
    try {
        const query = `INSERT INTO users (name, created_at)
                       VALUES ($1, NOW())`;
        await pool.query(query, [name]);
    } catch (e) {
        return e
    }
}

bot.command('create', async (ctx) => {
    const table = await createTable();
    await ctx.reply(table)
})

bot.command('user', async (ctx) => {
    const user = await createUser(ctx.from.first_name)
    await ctx.reply(user)
})

bot.command('start', async (ctx) => {
    await ctx.reply('hi, I am working...')
})

bot.start()