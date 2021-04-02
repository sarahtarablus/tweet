import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Showcase from './Showcase.js';

const Search = (props) => {
  const [input, setInput] = useState('');
  const [userTweets, setUserTweets] = useState([]);

 
const getTweets = async (url) => {
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
    <h3>Search for tweets by username or keywords</h3>
    <form>
      <div className='form-group'>
        <input className='form-control-lg bg-light mt-3 shadow-lg' onChange={({target}) => setInput(target.value)}  value={input} type='text' placeholder='search' required></input>
        </div>
      <div className='buttons form-group'>
        <button onClick={() => getTweets('/api/users')} type='submit' className='btn btn-dark mx-1 mb-5 shadow-lg'>Username</button>
        <button onClick={() => getTweets('/api/content')} type='submit' className='btn btn-dark mx-1 mb-5 shadow-lg'>Keyword</button>
      </div>
    </form>
    {userTweets.map((user) => {
      return  <Showcase key={user.id} image={user.image} name={user.name} userName={user.userName} date={user.date} text={user.text} link={user.link} link={user.link} picture={user.picture} retweets={user.retweets} likes={user.likes}/>
    })}
  </div>
  )}
  


export default Search;


