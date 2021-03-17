const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios');



app.use('/', express.static(path.join(__dirname, 'twitter','build')));

const header = {
  header: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}

app.get('/api/char', ((req, res) => {
  res.send(results)
  console.log(results)
}))

const results =   axios.get('https://api.twitter.com/1.1/search/tweets.json?q=nasa',header)
.then(res => console.log(res.data))
.catch(err => console.log(err))



const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});









