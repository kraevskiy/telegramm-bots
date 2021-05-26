const translate = require('../services/translate')

module.exports = () => async ctx => {
  if (!ctx.inlineQuery.query) return
  try {
    const res = await translate(ctx.inlineQuery.query, ctx.session.from, ctx.session.to)
    return ctx.answerInlineQuery(
      [
        {
          type:                  'article',
          id:                    ctx.inlineQuery.id,
          title:                 res.translated,
          description:           `${res.source_lang} -> ${ctx.session.to}`,
          input_message_content: {
            message_text: res.translated
          }
        }
      ]
    )
  } catch (err) {
    console.log(err)
    return ctx.answerInlineQuery(
      [
        {
          type:                  'article',
          id:                    ctx.inlineQuery.id,
          title:                 'Some error',
          description:           JSON.stringify(err)
        }
      ]
    )
  }
}
