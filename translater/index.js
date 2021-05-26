require('dotenv').config()
const {BOT_TOKEN_TRANSLATER} = process.env

const Telegraf = require('telegraf')
const TSL      = require('telegraf-session-local')
const Stage    = require('telegraf/stage')

const startCommand = require('./commands/start')
const helpCommand  = require('./commands/help')

const fromScene = require('./scenes/from')
const toScene   = require('./scenes/to')

const messageHandler     = require('./handlers/message')
const inlineQueryHandler = require('./handlers/inlineQuery')

const init = async (bot, config) => {
  const stage = new Stage([ fromScene, toScene ])
  bot.use(new TSL({database: 'translater/data/sessionLang.json'}).middleware())
  bot.use(stage.middleware())

  bot.start(startCommand())
  bot.help(helpCommand())
  bot.command('from', ctx => ctx.scene.enter('from'))
  bot.command('to', ctx => ctx.scene.enter('to'))
  bot.command('lang', ctx => ctx.reply(`${ctx.session.from} - ${ctx.session.to}`))

  bot.on('message', messageHandler())
  bot.on('inline_query', inlineQueryHandler())
  return bot
}

init(new Telegraf(BOT_TOKEN_TRANSLATER), process.env)
  .then(async bot => {
    await bot.launch()
    console.log(`Launched ${new Date()}`)
  })
  .catch(err => console.log('Error launched', err))

module.exports = init
