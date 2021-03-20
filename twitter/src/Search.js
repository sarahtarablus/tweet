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
  const [people, setPeople] = useState([]);

  // const createShowcase = () => {
  //   setPeople(characters);
  const getUser = () => {
    axios.get('/api/userTweets')
     .then(res => console.log(res))
  }

  

  return (
    <div className='search'>
    <form>
      <div className='form-group'>
        <input className='form-control-lg' onChange={({target}) => setInput(target.value)} value={input} type='text' placeholder='search' required></input>
      </div>
      <div className='buttons'>
        <button onSubmit={getUser} type='submit' className='btn btn-dark'>Username</button>
        <button type='submit' className='btn btn-dark'>Content</button>
      </div>
    </form>
     <div>
       <p>{input}</p>
     </div>
     <Showcase people={people}/>
      
      
    </div>
  
  )
}


export default Search;