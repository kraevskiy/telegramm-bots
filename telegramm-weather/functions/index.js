const functions = require('firebase-functions');
const Telegraf = require('telegraf')
const axios = require('axios')

let config = require('./env.json')
if (Object.keys(functions.config()).length) {
  config = functions.config()
}

const bot = new Telegraf(config.service.api_telegram)
bot.start(ctx => ctx.reply('Welcome'))
bot.on('text', ctx => {
  const query = ctx.update.message.text
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(query)}&appid=${config.service.api_weather}`)
    .then(res => {
      // res.data.main.temp - 273.15
      return ctx.reply(`Current temperature in ${query} is ${Math.floor(res.data.main.temp - 273.15)}℃`)
    })
    .catch(err => {
      return ctx.reply('This city is not exists', err)
    })
})
bot.launch()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=397baa0c7d51687bec10aa4296442b7f')
    .then(res => {
      // res.data.main.temp - 273.15
      return response.send(res.data.main.temp)
    })
    .catch(err => {
      return response.send(err)
    })
});
