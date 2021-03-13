import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faComment, faHeart} from '@fortawesome/free-solid-svg-icons';


const Showcase = (props) => {
  return (
  <div className='showcase'>
    <div className='usernameAndDate'>
     <p>{props.name}</p>
     <p>{props.username}</p>
     <p>{props.date}</p>
    </div>
    <div>
      <p>{props.content}</p>
    </div>
    <div className='icons'>
      <div className='icon'><FontAwesomeIcon icon={faComment}/></div>
      <div className='icon'><FontAwesomeIcon icon={faRetweet}/></div>
      <div className='icon'><FontAwesomeIcon icon={faHeart}/></div>
    </div> 
  </div>
  )
}

export default Showcase;