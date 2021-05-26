require("dotenv").config()
const BOT_TOKEN   = process.env.BOT_TOKEN_BMI
const Telegraf    = require('telegraf')
const session     = require('telegraf/session')
const Stage       = require('telegraf/stage')
const WizardScene = require('telegraf/scenes/wizard')

const bmiValue    = require('./bmiValue')

const bot = new Telegraf(BOT_TOKEN)

const createScene = new WizardScene(
  'create',
  ctx => {
    ctx.reply('1. Enter your weight (kg):')
    return ctx.wizard.next()
  },
  ctx => {
    ctx.wizard.state.weight = parseInt(ctx.message.text, 10)
    ctx.reply('2. Enter your Height (sm):')
    return ctx.wizard.next()
  },
  ctx => {
    ctx.wizard.state.height = parseInt(ctx.message.text, 10) / 10
    const weight            = ctx.wizard.state.weight
    const height            = ctx.wizard.state.height
    const bmi               = weight / height / height
    ctx.reply(`Index ${bmi} - ${bmiValue(bmi)}`)
    ctx.reply(`Thx! Reply - /start`)
    return ctx.scene.leave()
  }
)

const stage = new Stage()
stage.register(createScene)

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => ctx.scene.enter('create'))

bot.launch()
  .then(res => console.log('started'))
  .catch(err => console.log('Error', err))
