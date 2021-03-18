import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faComment, faHeart} from '@fortawesome/free-solid-svg-icons';


const Showcase = (props) => {
  return (
  <div>
    {props.people.map(person => {
      return <div className="showcase">
       <div className="media"> 
      <img src={person.img} class="rounded-circle mr-3" alt="Image"/>
      <div className="media-body">
      <h5 className="mt-0">{person.name}{person.username} <small><i>{person.date}</i></small></h5>
      <p>{person.content}</p>
      <div className='icons'>
      <div className='icon'><FontAwesomeIcon icon={faComment}/></div>
      <div className='icon'><FontAwesomeIcon icon={faRetweet}/></div>
      <div className='icon'><FontAwesomeIcon icon={faHeart}/></div>
      </div>
      </div> 
      </div> 
      </div>    
    })}
  </div>
    )}
  {/* //  <div>
  //   <div className='showcase'> <div className='usernameAndDate'>
  //       <p>{person.id}</p>
  //        <img src={person.img}/>
  //       <p>{person.name} {person.username} {person.date}</p>
  //       <p>{person.content}</p>
        
  //       <div className='icons'>
  //     <div className='icon'><FontAwesomeIcon icon={faComment}/></div>
  //     <div className='icon'><FontAwesomeIcon icon={faRetweet}/></div>
  //     <div className='icon'><FontAwesomeIcon icon={faHeart}/></div>
  //   </div> 
  //       </div>
  //       </div>
  //     })} 
  // </div>
  // ) */}


export default Showcase;