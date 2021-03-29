import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {
  const [input, setInput] = useState('');
  const [userTweets, setUserTweets] = useState([]);

 
const getUser = async (url) => {
    let urls = url;
    try{
      const options = {
          headers: {
            ContentType: 'application/json'
          },
          form: JSON.stringify({
            input
          })
        }
      
        const name = await axios.post(urls, options)
         .then(data => data)
         .catch(err => console.log(err))
        const tweets = await axios.get(urls)
         .then(res => setUserTweets([...res.data]))
         .catch(err => console.log(err))
    }catch (err) {
        console.log(err)
    }
}


 
 

return (
  <div className='search'>
    <form>
      <div className='form-group'>
        <input className='form-control-lg bg-light mt-5 shadow-lg' onChange={({target}) => setInput(target.value)}  value={input} type='text' placeholder='search' required></input>
      </div>
      <div className='buttons form-group'>
        <button onClick={() => getUser('/api/users')} type='submit' className='btn btn-dark mx-1 mb-5 shadow-lg'>Username</button>
        <button onClick={() => getUser('/api/content')} type='submit' className='btn btn-dark mx-1 mb-5 shadow-lg'>Content</button>
      </div>
    </form>
    {userTweets.map((user) => {
      return <div  key={user.id} className='d-flex align-items-center  flex-column twitterCard'><div className='card showcase shadow-lg'>
      <div className='media'> 
     <img src={user.image} className='rounded-circle mr-3' alt='Image'/>
     <div className='media-body'>
     <h5 className='mt-0'>{user.name}   <small className='text-secondary'>@{user.userName}</small><br></br> <small className='text-secondary'><i>{user.date}</i></small></h5>
     <p lan="en">{user.text}</p>
     <div className='icons'>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{user.retweets}</div>
     <div className='icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{user.likes}</div>
     </div>
     </div> 
     </div> 
     </div> 
     </div>
    })}
  </div>
  )}
  


export default Search;


