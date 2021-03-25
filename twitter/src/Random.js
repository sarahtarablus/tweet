import React, { useDebugValue } from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

const Random = (props) => {
  const [users, setUsers] = useState([]);
  const [tweets, setTweets] = useState({});

  const profilesUsers = [
    {id:80774161,name:"Adrian Younge",userName:"AdrianYounge",image:"http://pbs.twimg.com/profile_images/931210786021580800/Hldm3_9__normal.jpg"},
    {id:44196397,name:"Elon Musk",userName:"elonmusk",image:"http://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_normal.jpg"},
    {id:43298395,name:"Berliner Philarmoniker",userName:"BerlinPhil",image:"http://pbs.twimg.com/profile_images/459001538065600512/FOttw8Gb_normal.png"},
    {id:95092020,name:"Dr Jordan B Peterson",userName:"jordanbpeterson",image:"http://pbs.twimg.com/profile_images/839626059633029121/Wjk366Md_normal.jpg"},
    {id:110365072, name:"Gordon Ramsay",userName:"GordonRamsay",image:"http://pbs.twimg.com/profile_images/1349755150316040194/VpUCtbH8_normal.jpg"},
  ];

 
  useEffect(() => {
    setUsers([...profilesUsers])
  }, [])

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
  <div>
   {users.map((user) => {
    return  <div key={user.id} data-div_id={user.id} data-div_name={user.name} onClick={getTweets} className="card ran">
    <h5 className="card-title">{user.name}</h5>
    <small>@{user.userName}</small>
    <img className="card-img-top rounded" src={user.image} alt="image"/>
    </div>
   })} 
    <div  key={tweets.id} className='d-flex align-items-center flex-column twitterCard'><div className='card shadow-lg showcase'>
      <div className='media'> 
     <img src={tweets.image} className='rounded-circle mr-3' alt='Image'/>
     <div className='media-body'>
     <h5 className='mt-0'>{tweets.name}   <small className='text-secondary'>@{tweets.userName}</small>  <small className='text-secondary font-weight-light'><i>{tweets.date}</i></small></h5>
     <p>{tweets.text}</p>
     <div className='icons'>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{tweets.retweets}</div>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{tweets.likes}</div>
     </div>
     </div> 
     </div> 
     </div> 
     </div>
  </div>
 )}


export default Random;