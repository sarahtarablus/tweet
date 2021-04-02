import React, { useDebugValue } from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Showcase from './Showcase.js';

const Random = (props) => {
  const [tweets, setTweets] = useState({});
  const [users, setUsers] = useState([]);


 
useEffect(() => {
  getProfiles();  
}, [])



const getProfiles = async () => {
  await axios.get('/api/profiles')
    .then(res => setUsers([...res.data]))
    .catch(err => console.log(err))
}
  


const getTweets = async (e) => {
  const userId = e.currentTarget.dataset.div_id
  try{
    const options = {
      headers: {
        ContentType: 'application/json'
      },
        form: userId
    }
        
    const name = await axios.post('/api/random', options)
     .then(data => console.log(data))
     .catch(err => console.log(err))
    const randomtweet = await axios.get('/api/random')
     .then(res => setTweets({...res.data}))
     .catch(err => console.log(err))
  }catch (err) {
      console.log(err)
  }
}
 

 
  return (
  <div className='random'>
    <h3>Click on one of this users to get a random tweet</h3>
    {users.map((user) => {
  return <div key={user.id} data-div_id={user.id} data-div_name={user.name} 
              onClick={getTweets}className="card ran shadow-lg">
          <h5 className="card-title">{user.name}</h5>
          <small>@{user.userName}</small>
          <img className="rounded-circle px-5" src={user.image} alt="image"/>
          </div>
   })}
  {Object.keys(tweets).length === 0 ? '' : 
    <Showcase key={tweets.id} id={tweets.id} image={tweets.image} name={tweets.name} userName={tweets.userName} date={tweets.date} text={tweets.text} link={tweets.link}picture={tweets.picture} retweets={tweets.retweets} likes={tweets.likes}/>
   }
  </div>
 )}


export default Random;