require ('dotenv').config();
const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios'),
Datastore = require('nedb'),
bodyParser = require('body-parser');

const database = new Datastore('username.db');
database.loadDatabase();

const databaseProfiles = new Datastore('users.db');
databaseProfiles.loadDatabase();


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



storeInDatabase = (urls) => {
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: urls})
}



app.post('/api/content', ((req, res) => {
  const responseJson = JSON.parse(req.body.form);
  let userData = [];
  userData.push(responseJson);
  let username;
  for(let i = 0; i < userData.length; i++){
    username = userData[i].input 
  } 
  storeInDatabase(database,`https://api.twitter.com/1.1/search/tweets.json?q=${username}`)
 
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
  storeInDatabase(`https://api.twitter.com/labs/2/users/by?usernames=${username}`)
 
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




const getProfileInfo = (res) => {
  const response = res;
  const profile = {
                   'id':response[0].user.id,
                   'name':response[0].user.name, 
                   'userName':response[0].user.screen_name, 
                   'image':response[0].user.profile_image_url
                  } 
  return(profile) 
}




const getUser = async (url, res) => {
  const userUrl = await axios.get(url, headers) 
  .then(res => getId(res))
  .catch(err => console.log('Error' + '' + err))
  const userProfile = await axios.get(userUrl, headers)
  .then(res => getProfileInfo(res.data))
  .catch(err => console.log(err))
  database.remove({}, {multi: true}, ((err, data) => {}))
  databaseProfiles.insert({profile: userProfile})
 }


const url1 = `https://api.twitter.com/labs/2/users/by?usernames=adrianyounge`;
const url2 = `https://api.twitter.com/labs/2/users/by?usernames=gordonramsay`;
// const url3 = `https://api.twitter.com/labs/2/users/by?usernames=berlinphil`;
const url4 = `https://api.twitter.com/labs/2/users/by?usernames=elonmusk`;
const url5 = `https://api.twitter.com/labs/2/users/by?usernames=jordanbpeterson`;

 getUser(url1);
 getUser(url2); 
 //getUser(url3);
 getUser(url4);
 getUser(url5);


 app.get('/api/profile', ((req, res) => {
  databaseProfiles.find({}, async (err, data) => {
    if(err) {
      res.send(err)
      return;
    }
  const profiles = [data[0], data[1], data[2], data[3], data[4]];
  let profilesArray = [];

  for(let i = 0; i < profiles.length; i++){
     profilesArray.push(profiles[i].profile)
  }
  res.send(profilesArray)
  })
}))


const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});





