import React from 'react';
import {useState} from 'react';
import Showcase from './Showcase.js';


const characters = [
  {
   name: 'Jon Doe',
   username: '@jondoe',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   name: 'Brad Davis',
   username: '@braddavis',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   name: 'Mona Diaz',
   username: '@monadiaz',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  },
 
  {
   name: 'Laila Rally',
   username: '@lailarally',
   date: 'Mon Mar 09 13:35:09',
   content: 'Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user,Hello my name is Jon and I am a new user'
  }
 ]


const Search = (props) => {
  const [people, setPeople] = useState([]);

  const createShowcase = () => {
    setPeople(characters);

  console.log('state', {people})
  }

  return (
    <div className='search'>
      <div className='input'>
        <input onChange={createShowcase} name='searchInput' placeholder='search' required></input>
      </div>
      <div className='buttons'>
        <button>Username</button>
        <button>Content</button>
      </div>
      <div>
    
     <Showcase people={people}/>
      
      
      </div>
    </div>
  )
}

export default Search;