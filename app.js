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



const getDay = (date) => {
  let day = new Date(date).getDay()
  return isNaN(day) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]
}

const getMonth = (date) => {
  let month = (new Date(date).getMonth())
  return isNaN(month) ? null : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
}


const getPicture = (media) => {
  let picture;
  media === undefined ? picture = '' :  media.forEach(m => {picture = m.media_url})
  return picture
}



const getUrlFromText = (urls) => {
  let link
  urls !== [] ? urls.forEach(url => {url.url === undefined ? link = '' : link = url.url}) : urls = '';
  return link
}


const getPictureUrlLink = (media) => {
  let pictureUrl;
  media === undefined ? pictureUrl = '' :  media.forEach(m => {pictureUrl = m.url})
  return pictureUrl;
}


const getTextWithoutLink = (text, url) => {
  let textWithoutLink;
  if(text.indexOf(url) !== -1){
    textWithoutLink = text.replace(url, '');
  } else {
    textWithoutLink = text;
  }
  return textWithoutLink
}


const getTweets = async (res) => {
  const tweets = res;
 //console.log(tweets)
  let tweetsArray = [];
  tweets.forEach(t => {
    let media = t.entities.media;
    let urls = t.entities.urls;
    let entireText = t.full_text;
    let picture = getPicture(media);
    let link = getUrlFromText(urls);
    let pictureUrl = getPictureUrlLink(media);
    let text1 = getTextWithoutLink(entireText, pictureUrl);
    let text = getTextWithoutLink(text1, link);
    // let f;
    // if(text.indexOf(link) !== -1){
    //   f = text.replace(link, '')
   
    // }else {
    //   f = text
    // }

   
 
    let tweetDate = new Date(t.created_at);
    let day = getDay(t.created_at);
    let date = tweetDate.getDate();
    let month = getMonth(t.created_at);
      
    t.created_at = `${day} ${month} ${date}`;
    
      const tweet = {
        'date':t.created_at,
        'id':t.id,
        'text':text,
        'link': link,
        'picture': picture,
        'name':t.user.name, 
        'userName':t.user.screen_name, 
        'image':t.user.profile_image_url,
        'likes':t.favorite_count,
        'retweets':t.retweet_count
      } 
    tweetsArray.push(tweet);
 })
    return tweetsArray;
}  


const headers = {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  },
  ContentType: 'application/json'
}


const storeUrlInDatabase = (uri) => {
  database.remove({}, {multi: true}, ((err, data) => {}))
  database.insert({url: uri})
}



app.post('/api/content', ((req, res) => {
  const responseJson = JSON.parse(req.body.form);
  let userData = [];
  userData.push(responseJson);
  let username;
  for(let i = 0; i < userData.length; i++){
    username = userData[i].input 
  } 
  storeUrlInDatabase(`https://api.twitter.com/1.1/search/tweets.json?q=${username}&count=20&include_entities=true&tweet_mode=extended&expansions=attachments.media_keys&media.fields=preview_image_url,url,width,height`)
  
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
     .then(res => getTweets(res.data.statuses))
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
  storeUrlInDatabase(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=20&include_entities=true&tweet_mode=extended&expansions=attachments.media_keys&media.fields=preview_image_url,url,width,height`)

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
  storeUrlInDatabase(`https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=200&include_entities=true&tweet_mode=extended&expansions=attachments.media_keys&media.fields=preview_image_url,url,width,height`)
 
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





