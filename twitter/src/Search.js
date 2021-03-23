import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {
  const [input, setInput] = useState('');
  const [userTweets, setUserTweets] = useState([]);

 
  const getUser = async () => {
    try{
        const options = {
          headers: {
            ContentType: 'application/json'
          },
          form: JSON.stringify({
            input
          })
        }
      
        const name = await axios.post('/api',options)
         .then(data => data)
         .catch(err => console.log(err))
        const tweets = await axios.get('/api')
         .then(res => setUserTweets([...res.data]))
         .catch(err => console.log(err))
         console.log(userTweets)
    }catch (err) {
        console.log(err)
    }
  }


 
 

return (
  <div className='search'>
    <form>
      <div className='form-group'>
        <input className='form-control-lg' onChange={({target}) => setInput(target.value)}  value={input} type='text' placeholder='search' required></input>
      </div>
      <div className='buttons'>
        <button onClick={getUser} type='submit' className='btn btn-dark'>Username</button>
        <button type='submit' className='btn btn-dark'>Content</button>
      </div>
    </form>
    {userTweets.map((user) => {
      return <div key={user.id} className="showcase">
      <div className="media"> 
     <img src={user.image} className="rounded-circle mr-3" alt="Image"/>
     <div className="media-body">
     <h5 className="mt-0">{user.name}{user.userName} <small><i>{user.date}</i></small></h5>
     <p>{user.text}</p>
     <div className='icons'>
     <div className='icon'><FontAwesomeIcon icon={faRetweet}/>{user.retweets}</div>
     <div className='icon'><FontAwesomeIcon icon={faHeart}/>{user.likes}</div>
     </div>
     </div> 
     </div> 
     </div> 
    })}
  </div>
  )}
  


export default Search;




// const characters = [
//   {
//    img: ('/images/pic1.jpg'),
//    name: 'Jon Doe',
//    username: '@jondoe',
//    date: 'Mon Mar 09 13:35:09',
//    content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
//   },
 
//   {
//    img: '/images/pic1.jpg',
//    name: 'Brad Davis',
//    username: '@braddavis',
//    date: 'Mon Mar 09 13:35:09',
//    content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
//   },
 
//   {
//    img: '/images/pic1.jpg',
//    name: 'Mona Diaz',
//    username: '@monadiaz',
//    date: 'Mon Mar 09 13:35:09',
//    content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
//   },
 
//   {
//    img: '/images/pic1.jpg',
//    name: 'Laila Rally',
//    username: '@lailarally',
//    date: 'Mon Mar 09 13:35:09',
//    content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
//   }
//  ]

