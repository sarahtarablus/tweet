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


// const getTweets = async (res) => {
//   const tweets = res;
//   let tweetsArray = [];
 
//    for(let i = 0; i < tweets.length; i++){
     
//     console.log(tweets[i].user)
//       let tweetDate = new Date(tweets[i].created_at);
//       let day = getDay(tweets[i].created_at);
//       let date = tweetDate.getDate();
//       let month = getMonth(tweets[i].created_at);
    
    
   
//     tweets[i].created_at = `${day} ${month} ${date}`
 
//      const tweet = {
//       'date':tweets[i].created_at,
//       'id':tweets[i].id,
//       'text':tweets[i].text,
//       'name':tweets[i].user.name, 
//       'userName':tweets[i].user.screen_name, 
//       'image':tweets[i].user.profile_image_url,
//       'likes':tweets[i].favorite_count,
//       'retweets':tweets[i].retweet_count
//      } 
//     tweetsArray.push(tweet)     
// } 
// return(tweetsArray)  
// }
 


const getTweets = async (res) => {
  const tweets = res;
  //console.log(tweets)
  for(let i = 0; i < tweets.length; i++){
    let media = tweets[i].entities.media
     if(media !== undefined){
      console.log(media)
    }else {
     console.log('no pictures')
     }
    //console.log(tweets[i].entities.media)
    // for(let j = 0; j < t.length; j++){
    //   console.log(t[j].url)
    // }
  }
  
  let tweetsArray = [];
 
  // for(let i = 0; i < tweets.length; i++){
  //    tweets[i] = await axios.get(`https://api.twitter.com/1.1/statuses/show.json?id=${tweets[i].id}&tweet.fields=attachments`, headers)
  //   .then(res => console.log(res))
    //   let tweetDate = new Date(tweets[i].created_at);
    //   let day = getDay(tweets[i].created_at);
    //   let date = tweetDate.getDate();
    //   let month = getMonth(tweets[i].created_at);
    
    // tweets[i].created_at = `${day} ${month} ${date}`
 
    //  const tweet = {
    //   'date':tweets[i].created_at,
    //   'id':tweets[i].id,
    //   'text':tweets[i].text,
    //   'name':tweets[i].user.name, 
    //   'userName':tweets[i].user.screen_name, 
    //   'image':tweets[i].user.profile_image_url,
    //   'likes':tweets[i].favorite_count,
    //   'retweets':tweets[i].retweet_count
    //  } 
    // tweetsArray.push(tweet)  
 
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
  database.insert({url:`https://api.twitter.com/1.1/search/tweets.json?q=${username}&count=20&include_entities=true`})

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
     .then(res => getTweets(res.data))
     .then(data => res.send(data))
     .catch(err => console.log('Error' + '' + err)) 
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
  database.insert({url: `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=20&include_entities=true`})
 
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
     const url = data[data.length-1].url;
     const userTweets = await axios.get(url, headers)
     .then(res => getTweets(res.data))
     .then(data=> res.send(data))
     .catch(err => console.log(err))
  
     }catch(err) {
      console.log(err)
  }
})}))



getProfile = async (res) => {
  const profiles = res;
  const profile = {
      'id':profiles.id,
      'name':profiles.name, 
      'userName':profiles.screen_name, 
      'image':profiles.profile_image_url,
  } 
 return profile;
}



app.get('/api/profiles', (async (req, res) => {
  const profiles = ['AdrianYounge', 'elonmusk', 'BerlinPhil', 'jordanbpeterson', 'GordonRamsay']
  
 
    let url1 = `https://api.twitter.com/1.1/users/show.json?screen_name=${profiles[0]}`;
    let url2 = `https://api.twitter.com/1.1/users/show.json?screen_name=${profiles[1]}`;
    let url3 = `https://api.twitter.com/1.1/users/show.json?screen_name=${profiles[2]}`;
    let url4 = `https://api.twitter.com/1.1/users/show.json?screen_name=${profiles[3]}`;
    let url5 = `https://api.twitter.com/1.1/users/show.json?screen_name=${profiles[4]}`;

   
    const profileUserOne = await axios.get(url1, headers)
    .then(res => getProfile(res.data))
    
    const profileUserTwo = await axios.get(url2, headers)
    .then(res => getProfile(res.data))
    .catch(err => console.log(err))
    
    const profileUserThree = await axios.get(url3, headers)
    .then(res => getProfile(res.data))
    .catch(err => console.log(err))
    
    const profileUserFour = await axios.get(url4, headers)
    .then(res => getProfile(res.data))
    .catch(err => console.log(err))

    const profileUserFive = await axios.get(url5, headers)
    .then(res => getProfile(res.data))
    .catch(err => console.log(err))
   
     const usersProfiles = axios.all([profileUserOne, profileUserTwo,   profileUserThree, profileUserFour, profileUserFive])
      .then(responses => res.send(responses))
      .catch(err => console.log(err)) 
}))




app.post('/api/random', ((req, res) => {
  const userId = JSON.parse(req.body.form);
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=20&include_entities=true`})
 
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





