const Telegraf = require('telegraf')
require('dotenv').config()
const bot          = new Telegraf(process.env.BOT_TOKEN_IMAGES)
const searchImages = require('./searchImages')

bot.start(ctx => {
  return ctx.reply(`
Hi! This is images inline bot!
Just type is any chat @images_illia_bot <image-name>
and you will receive the some images for this query`
  )
})

bot.on('inline_query', async (ctx) => {
  const result = await searchImages(ctx.inlineQuery.query)
  if (!ctx.inlineQuery.query) return
  const data = result.data.hits.map(hit => {
    return {
      type:         'photo',
      id:           hit.id,
      photo_url:    hit.largeImageURL,
      thumb_url:    hit.previewURL,
      title:        hit.tags,
      description:  hit.tags,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `${hit.likes} ❤ `,
              url: hit.pageURL,
            },
          ],
          [
            {
              text:                "Share bot with friends",
              switch_inline_query: "",
            },
          ],
        ],
      },
    };
  });

  return ctx.answerInlineQuery(data)
})

bot.launch()
  .then(res => console.log('Started'))
  .catch(err => console.log('Start Error', err))
