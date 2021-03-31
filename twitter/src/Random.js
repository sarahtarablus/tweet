import React, { useDebugValue } from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

const Random = (props) => {
  //const [profile, setProfile] = useState([]);
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
            form: 
              userId
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
   {users.map((user) => {
    return  <div key={user.id} data-div_id={user.id} data-div_name={user.name}  onClick={getTweets} className="card ran shadow-lg">
    <h5 className="card-title">{user.name}</h5><small>@{user.userName}</small>
    <img className="rounded-circle px-5" src={user.image} alt="image"/>
    </div>
   })} 
   {Object.keys(tweets).length === 0 ? <div></div> : 
    <div  key={tweets.id} className='d-flex align-items-center flex-column'><div className='card showcase shadow-lg'>
      <div className='media'> 
     <img src={tweets.image} className='rounded-circle mr-3' alt='Image'/>
     <div className='media-body'>
     <div className='name-date'>
       <h5 className='mt-0'>{tweets.name}
       <div><small className='username text-secondary'>@{tweets.userName}</small></div></h5>
       <small className='text-secondary'><i>{tweets.date}</i></small>
     </div>
     <p className='text'lan="en">{tweets.text}<img src={tweets.picture} className='pic' alt='Image'/></p>
     <div className='icons'>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{tweets.retweets}</div>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{tweets.likes}</div>
     </div>
     </div> 
     </div> 
     </div> 
     </div>
}
  </div>
 )}


export default Random;