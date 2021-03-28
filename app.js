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
    let url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=200&exclude_replies=true&include_rts=false`
    return url
  }
}


const getDay = (date) => {
  let day = new Date(date).getDay()
  return isNaN(day) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]
}

const getMonth = (date) => {
  let month = (new Date(date).getMonth())
  return isNaN(month) ? null : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
}


const getTweets = async (res) => {
  const tweets = res;
  let tweetsArray = [];
 
   for(let i = 0; i < tweets.length; i++){
      let tweetDate = new Date(tweets[i].created_at);
      let day = getDay(tweets[i].created_at);
      let date = tweetDate.getDate();
      let month = getMonth(tweets[i].created_at);
    
   
    tweets[i].created_at = `${day} ${month} ${date}`
 
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
    console.log(userUrl)
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
     try{
     const url = data[data.length - 1].url;
     const userUrl = await axios.get(url, headers)
     .then(res => getId(res))
     .catch(err => console.log('Error' + '' + err))
     const userTweets = await axios.get(userUrl, headers)
     .then(res => getTweets(res.data))
     .catch(err => console.log(err))
     
    //  for(let i = 0; i < userTweets.length; i++){
    //   console.log(userTweets[i].id_str)
    //   let tweet = userTweets[i];
    //   userTweets[i] = await axios.get(`https://api.twitter.com/1.1/statuses/show.json?id=${tweet.id}`, headers)
    //  .then(res => console.log(res))
    //  }
    res.send(userTweets)
  
  }catch(err) {
    console.log(err)
  }
})}))




app.post('/api/random', ((req, res) => {
  const userId = JSON.parse(req.body.form);
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





