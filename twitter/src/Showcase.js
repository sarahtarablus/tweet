import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faComment, faHeart} from '@fortawesome/free-solid-svg-icons';


const Showcase = (props) => {
  return (

   <div>
      {props.people.map(person => {
        return   <div className='showcase'> <div className='usernameAndDate'>
        <p>{person.id}</p>
        <p>{person.name}</p>
        <p>{person.username}</p>
        <p>{person.content}</p>
        <p>{person.date}</p>
        </div>
        </div>
      })}
    
   
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