require ('dotenv').config();
const express = require('express'),
path = require('path'),
app = express(),
axios = require('axios');


app.use('/', express.static(path.join(__dirname, 'twitter','build')));


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
  let tweetsArray = [];
  for(let i = 0; i < tweets.length; i++){
    const tweet = {
                   'date':tweets[i].created_at,
                   'id':tweets[i].id,
                   'text':tweets[i].text,
                   'name':tweets[i].user.name, 
                   'userName':tweets[i].user.screen_name, 
                   'image':tweets[i].user.profile_image_url
                  } 
    tweetsArray.push(tweet)      
  } 
  return(tweetsArray) 
}



const getTweetsFromOneUser = async () => {
  try {
    const userUrl = await axios.get(endpointUrl, headers)
     .then(res => getId(res))
     .catch(err => console.log('Error' + err))
    const userTweets = await axios.get(userUrl, headers)
     .then(res => getTweets(res))
     .catch(err => console.log(err))
     app.get('/api/userTweets', ((req, res) => {
      res.send(userTweets)
    }))  
  }catch (err) {
    console.log(err)
  }
}

getTweetsFromOneUser();



// app.get('/api/results', ((req, res) => {
//   res.send(results)
//   //console.log(tweetsResults)
// }))


 
const PORT = 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${url}`);
});


// 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Aandysterks&include_entities=1&result_type=mixed'




