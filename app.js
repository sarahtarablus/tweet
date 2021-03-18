require ('dotenv').config();
const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios');


app.use('/', express.static(path.join(__dirname, 'twitter','build')));

const header = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}

app.get('/api/results', ((req, res) => {
  res.send(results)
  console.log(results)
}))

const results =   axios.get('https://api.twitter.com/2/users/by/username/andysterks', header)
.then(res => console.log(res.data))
.catch(err => console.log('Error' + err))



const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});









