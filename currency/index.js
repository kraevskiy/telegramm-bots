const Telegraf = require('telegraf')
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')
const cc = require('currency-codes')
const bot = new Telegraf(process.env.BOT_TOKEN_CURRENCY)

bot.start(ctx => {
  return ctx.reply('Welcome to Mono Currency Bot')
})


bot.hears(/^[A-Z]+$/i, async ctx => {
  const clientCurCode = ctx.message.text
  const currency = cc.code(clientCurCode)

  if(!currency){
    return ctx.reply(`Currency didn't found`)
  }
  try {
    const currencyObj = await axios.get('https://api.monobank.ua/bank/currency')

    const foundCurrency = currencyObj.data.find(cur=>{
      return cur.currencyCodeA.toString() === currency.number
    })

    if (!foundCurrency || !foundCurrency.rateBuy || !foundCurrency.rateSell) {
      return ctx.reply(`Currency didn't found in Monobank API`)
    }
    return ctx.replyWithMarkdown(`CURRENCY: *${currency.code}*\nRate BUY: *${foundCurrency.rateBuy}*\nRate SELL: *${foundCurrency.rateSell}*`)
  } catch (error) {
    return ctx.reply(error)
  }
})


bot.startPolling()