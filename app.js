const { response } = require('express');

require ('dotenv').config();
const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios'),
Datastore = require('nedb'),
bodyParser = require('body-parser');

const database = new Datastore('username.db');
database.loadDatabase();



app.use('/', express.static(path.join(__dirname, 'twitter','build')));



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
  console.log(tweets)
  let tweetsArray = [];
  for(let i = 0; i < tweets.length; i++){
    const tweet = {
                   'date':tweets[i].created_at,
                   'id':tweets[i].id,
                   'text':tweets[i].text,
                   'name':tweets[i].user.name, 
                   'userName':tweets[i].user.screen_name, 
                   'image':tweets[i].user.profile_image_url,
                   'likes':tweets[i].favorite_count,
                   'retweets':tweets[i].retweet_count
                  } 
    tweetsArray.push(tweet)      
  } 
  return(tweetsArray) 
}



const headers = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}





const getTweetsFromOneUser = async (username) => {
  const url = createUrl(username)
  try {
    const userUrl = await axios.get(url, headers)
     .then(res => getId(res))
     .catch(err => console.log('Error' + err))
    const userTweets = await axios.get(userUrl, headers)
     .then(res => getTweets(res))
     .catch(err => console.log(err))
  } catch (err) {
    console.log(err)
  }
}






app.use(bodyParser.json({extended: true}));




app.post('/api', ((req, res) => {
  const responseJson = JSON.parse(req.body.form);
  let userData = [];
  userData.push(responseJson);
  let username;
  for(let i = 0; i < userData.length; i++){
    username = userData[i].input 
  } 
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: `https://api.twitter.com/labs/2/users/by?usernames=${username}`})

  res.json({
    sataus: 'Request received'
    }) 
}))



app.get('/api', (req, res) => {
 
 database.find({}, async (err, data) => {
    if(err) {
      res.send(err)
      return;
    }
    const url = data[data.length - 1].url;
    const userUrl = await axios.get(url, headers)
    .then(res => getId(res))
    .catch(err => console.log('Error' + err))
    const userTweets = await axios.get(userUrl, headers)
    .then(res => getTweets(res))
    .catch(err => console.log(err))

    res.send(userTweets)
    //console.log(userTweets)
 })
})   
    














 
const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});


// 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Aandysterks&include_entities=1&result_type=mixed'




