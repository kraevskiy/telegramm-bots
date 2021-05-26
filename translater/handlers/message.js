const translate = require('../services/translate')

module.exports = () => async ctx => {
  ctx.session.to = ctx.session.to || 'en'

  if (!ctx.session.from) {
    return ctx.reply('Please set /from language first')
  }

  try {
    const res = await translate(ctx.message.text, ctx.session.from, ctx.session.to)

    return ctx.reply(res.translated)
  } catch (err) {
    console.log(err)
    return ctx.reply('some error')
  }
}
