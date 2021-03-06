const Scene = require('telegraf/scenes/base')

const to = new Scene('to')

to.enter(ctx => {
  ctx.reply('Hi! Please send a code of language')
})

to.on('text', ctx => {
  if (ctx.message.text.length > 2 || ctx.message.text.length === 1) {
    return ctx.reply('Language must be a 2 chars')
  }
  ctx.session.to = ctx.message.text.toLowerCase()
  ctx.reply(`'${ctx.message.text}' - set as a language`)
  return ctx.scene.leave()
})

to.leave(ctx => {
  ctx.reply('Thanks for setting language')
})

to.on('message', ctx => ctx.reply(`Only text message please`))

module.exports = to
