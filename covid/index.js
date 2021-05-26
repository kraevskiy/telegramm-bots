require('dotenv').config()
const BOT_TOKEN            = process.env.BOT_TOKEN_COVID
const Telegraf             = require('telegraf')
const covidService         = require('./services/covid')
const formatCountryMessage = require('./messages/country')

const bot                  = new Telegraf(BOT_TOKEN)

bot.start(ctx => ctx.reply(`
Welcome to COVID BOT!
You need to send a name country where you need to get COVID data
`))

bot.help(ctx => ctx.reply(`
Example:
Ukraine
Russia
China
`))

bot.hears(/.*/, async ctx => {
  const data = await covidService(ctx.message.text)
  if (data && data.results === 0) {
    return ctx.reply(`Country "${ctx.message.text}" not found. Try another`)
  }
  return ctx.replyWithMarkdown(formatCountryMessage(data.response[0]))
})

bot.launch()
  .then(res => {
    const date = new Date()
    console.log(`Bot launched at ${date}`)
  })
  .catch(err => console.log(err))
