const axios = require('axios')

module.exports = async country => {
  const options = {
    params:  {country: country},
    headers: {
      'x-rapidapi-key':  '826631c601msh82ff5586ad06ae7p11d25fjsn71156c39c51a',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com'
    }
  };

  return await axios.get('https://covid-193.p.rapidapi.com/statistics', options).then(res => {
    return res.data
  }).catch(err => {
    return err
  });
}
