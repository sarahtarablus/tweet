const express = require('express'),
path = require('path'),
app = express();


app.use('/', express.static(path.join(__dirname, 'twitter','build')));

const options = {
  url: 'https://api.twitter.com/oauth2/token',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json',
    'api_key': '54UvuoFTNORzhA5p7B2OulF4i',
    'apy_key_secret': 'CnQ9eijx7wrhHYocYqjUavj0dRwKCiVq9XnT5WBkSAebQKktrG'
    },
  body: {
    '--data-urlencode': 'grant_type=client_credentials'
  }
}


app.post(options, ((req, res) => {
  // res.sendFile(path.join(__dirname,'twitter', 'build', 'index.html'));
  res.send(res.data)
  console.log(res.data)
}));


app.get('/api/char', ((req, res) => {
  axios.post()
    .then(res => console.log(res.data))
    // res.sendFile(path.join(__dirname,'twitter', 'build', 'index.html'));
    
 
  // res.sendFile(path.join(__dirname,'twitter', 'build', 'index.html'));
  res.send('')
}));

// // app.post(options, (req, res) => { 
// //   console.log(res.data)
// //   //res.send(res.data);
// // })

const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});

const char = {
  'name': 'jon',
  'id': '1'
}







