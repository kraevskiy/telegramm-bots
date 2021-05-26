const Telegraf  = require('telegraf')
const Sentiment = require('sentiment')
const dotenv    = require('dotenv')
dotenv.config()

const sentiment = new Sentiment()
const bot = new Telegraf(process.env.BOT_TOKEN_CURRENCY)

bot.start(ctx => {
  return ctx.reply('Welcome to Sentiments Bot')
})

bot.help(ctx => ctx.reply('this bot will detect sentiments of text'))
bot.hears(/.*/, ctx => {
  const result = sentiment.analyze(ctx.message.text)
  console.log(result)
  return ctx.reply(`
    Score: ${result.score} 
    Test: ${result.comparative}
  `)
})


bot.launch()
