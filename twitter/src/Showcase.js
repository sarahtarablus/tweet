import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';


const Showcase = (props) => {
  return (
  <div>
    {props.userTweets.map(user => {
      return <div className="showcase">
       <div className="media"> 
      <img src={user.image} class="rounded-circle mr-3" alt="Image"/>
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
  

export default Showcase;