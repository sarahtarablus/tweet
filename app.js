const express = require('express'),
path = require('path'),
app = express();


app.use('/api/', express.static(path.join(__dirname, 'twitter','build')));


app.get('/', ((req, res) => {
  res.sendFile(path.join(__dirname,'twitter', 'build', 'index.html'));
}));

// app.post(options, (req, res) => { 
//   console.log(res.data)
//   //res.send(res.data);
// })

const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});

// const char = {
//   "name": "jon",
//   "age": "34"
// }



// const options = {
//   url: 'https://api.twitter.com/oauth2/token',
//   headers: {
//     'Content-type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': {
//       'authorization-type': 'basic',
//       'username': '54UvuoFTNORzhA5p7B2OulF4i',
//       'password': 'CnQ9eijx7wrhHYocYqjUavj0dRwKCiVq9XnT5WBkSAebQKktrG'
//     }
//   },
//   body: {
//     'grant_type': 'client_credentials'
//   }
// }

