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
app.use(bodyParser.json({extended: true}));



const getId = (res) => {
  let user = res.data.data;
  for(let i = 0; i < user.length; i++){
    let userId = user[i].id
    let url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=10&exclude_replies=true&include_rts=false`
    return url
  }
}



const getTweets = (res) => {
  const tweets = res;
  let tweetsArray = [];
  for(let i = 0; i < tweets.length; i++){
    //  const tweetsUrls = tweets[i].entities.urls
    // for(let j = 0; j < tweetsUrls.length; j++){
    //   const t = tweets[i].entities.urls
    //   for(let x = 0; x < t.length; x++){
    //     console.log(t[x].expanded_url)
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
         console.log(tweet)
         tweetsArray.push(tweet)   
         return(tweetsArray) 
      }
    
    }
   
   
       
  




const headers = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}




app.post('/api/content', ((req, res) => {
  const responseJson = JSON.parse(req.body.form);
  let userData = [];
  userData.push(responseJson);
  let username;
  for(let i = 0; i < userData.length; i++){
    username = userData[i].input 
  } 
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: `https://api.twitter.com/1.1/search/tweets.json?q=${username}`})

  res.json({
    sataus: 'Request received'
  }); 
}));



app.get('/api/content', ((req, res) => {
  database.find({}, async (err, data) => {
    if(err) {
      res.send(err)
      return;
    }
    const url = data[data.length - 1].url;
    const userUrl = await axios.get(url, headers)
     .then(res => res.data.statuses)
     .then(res => getTweets(res))
     .catch(err => console.log('Error' + '' + err))

    res.send(userUrl);
 });
}));



app.post('/api/users', ((req, res) => {
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
    }); 
}));



app.get('/api/users', ((req, res) => {
  database.find({}, async (err, data) => {
     if(err) {
       res.send(err)
       return;
     }
     const url = data[data.length - 1].url;
     const userUrl = await axios.get(url, headers)
     .then(res => getId(res))
     .catch(err => console.log('Error' + '' + err))
     const userTweets = await axios.get(userUrl, headers)
     .then(res => getTweets(res.data))
     .catch(err => console.log(err))
 
     res.send(userTweets);
  });
}));




app.post('/api/random', ((req, res) => {
  const userId = JSON.parse(req.body.form);
  console.log(userId)
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=200&exclude_replies=true&include_rts=false`})
 
  res.json({
    sataus: 'Request received'
    }); 
}));


app.get('/api/random', ((req, res) => {
  database.find({}, async (err, data) => {
    if(err){
      res.send(err)
      return;
    }
    const url = data[data.length - 1].url;
    console.log(url)
    const userTweets = await axios.get(url, headers)
     .then(res => getTweets(res.data))
     .then(res => res[Math.floor((Math.random() * res.length) + 1)])
     .catch(err => console.log(err))
    res.send(userTweets)
  })
}))


const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});





