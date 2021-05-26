const Telegraf = require('telegraf')
const dotenv = require('dotenv')
dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN_ECHO)

bot.start(ctx => {
  ctx.reply(`
    Hello it's echo bot
  `)
})

bot.help(ctx => {
  ctx.reply(`
    Send any message and i will copy it
  `)
})

bot.on('message', ctx => {
  ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
  console.log(ctx)
})

bot.launch()
  .then(res => console.log('Run'))
  .catch(err => console.log(err))