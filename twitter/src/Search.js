import React from 'react';
import {useState} from 'react';
import Showcase from './Showcase.js';
import axios from 'axios';


const characters = [
  {
   img: ('/images/pic1.jpg'),
   name: 'Jon Doe',
   username: '@jondoe',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   img: '/images/pic1.jpg',
   name: 'Brad Davis',
   username: '@braddavis',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   img: '/images/pic1.jpg',
   name: 'Mona Diaz',
   username: '@monadiaz',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   img: '/images/pic1.jpg',
   name: 'Laila Rally',
   username: '@lailarally',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  }
 ]


const Search = (props) => {
  const [input, setInput] = useState('');
  const [user, setUser] = useState([]);


  const createShowcaseData = (tweets) => {
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
    setUser(...tweetsArray)
    console.log(user)

    }
  }
  
  
  const getUser = () => {
    const options = {
      headers: {
        ContentType: 'application/json'
      },
      form: JSON.stringify({
        input
      })
    }
    axios.post('/api/post',options)
    .then(data => console.log(data))
    .catch(err => console.log(err))

  
  }

 

  

  return (
    <div className='search'>
    <form>
      <div className='form-group'>
        <input className='form-control-lg' onChange={({target}) => setInput(target.value)} value={input} type='text' placeholder='search' required></input>
      </div>
      <div className='buttons'>
        <button onClick={getUser} type='submit' className='btn btn-dark'>Username</button>
        <button type='submit' className='btn btn-dark'>Content</button>
      </div>
    </form>
     {/* <Showcase /> */}
      
      
    </div>
  
  )
}


export default Search;