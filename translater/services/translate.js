const axios = require("axios").default;

module.exports = async (text, from, to) => {
  let options = {
    method: 'POST',
    url: 'https://kiara-translate.p.rapidapi.com/get_translated/',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '826631c601msh82ff5586ad06ae7p11d25fjsn71156c39c51a',
      'x-rapidapi-host': 'kiara-translate.p.rapidapi.com'
    },
    data: {input: text, lang: to}
  };

  return axios.request(options).then(function (res) {
    return res.data
  }).catch(function (error) {
    return error
  });
}
