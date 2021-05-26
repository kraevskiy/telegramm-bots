const Telegraf = require('telegraf')
const dotenv = require('dotenv')
dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN_START)

bot.use(async (ctx, next) => {
  ctx.reply("middleware")
  ctx.state.isSend = true
  await next(ctx)
})

bot.catch((err, ctx)=>{
  console.log('error', err)
})

bot.start(ctx => {
  const {state} = ctx
  return ctx.reply(`Start command ${state.isSend}`)
})
bot.help(ctx => ctx.reply('Help'))
bot.settings(ctx => ctx.reply('Help1'))

bot.command(['stop', 'finish'], ctx => ctx.reply('stop'))

bot.mention('botfather', ctx => ctx.reply('botfather'))

bot.phone('+380980444195', ctx => ctx.reply('phone number'))

bot.hashtag('bot', ctx => ctx.reply('bot hastag'))

bot.command('ctx', ctx => {
  console.log(ctx)
  ctx.reply('ok')
})

bot.hears('dog', ctx=>{
  ctx.reply('who dog')
})


bot.on(['message', 'edited_message'], ctx => {
  console.log(ctx.updateType)
  console.log(ctx.updateSubTypes)
})
bot.launch()
  .then(res => {
    console.log(res)
    console.log('started')
  })
  .catch(err => {
    console.log(err)
  })