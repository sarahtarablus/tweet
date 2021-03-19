require ('dotenv').config();
const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios');


app.use('/', express.static(path.join(__dirname, 'twitter','build')));


app.get('/api/results', ((req, res) => {
  res.send(results)
  console.log(results)
}))


const headers = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}


const endpointUrl = 'https://api.twitter.com/labs/2/users/by?usernames=andysterks'



const getId = (res) => {
  let user = res.data.data;
  for(let i = 0; i < user.length; i++){
    let userId = user[i].id
    let url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=10&exclude_replies=true&include_rts=false`
    return url
  }
}


const getTweets = (res) => {
  const tweets = res.data;
  for(let i = 0; i < tweets.length; i++){
    //console.log(tweets[i].user.profile_image_url)
    console.log(tweets[i].created_at,tweets[i].id,tweets[i]. text,tweets[i].user.name, tweets[i].user.screen_name, tweets[i].user.profile_image_url)
  }
}


const getTweetsFromOneUser = async () => {
  try {
    const userUrl = await axios.get(endpointUrl, headers)
     .then(res => getId(res))
     .catch(err => console.log('Error' + err))
    const userTweets = axios.get(userUrl, headers)
     .then(res => getTweets(res))
     .catch(err => console.log(err))

  }catch (err) {
    console.log(err)
  }
}

getTweetsFromOneUser();

 
const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});


// 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Aandysterks&include_entities=1&result_type=mixed'




