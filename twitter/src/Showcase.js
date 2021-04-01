import React, { useDebugValue } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';

const Showcase = (props) => {
  return (
    <div  key={props.id} className='d-flex align-items-center flex-column'><div className='card showcase shadow-lg'>
      <div className='media'> 
        <img src={props.image} className='rounded-circle mr-3' alt='Image'/>
        <div className='media-body'>
          <div className='name-date'>
            <h5 className='mt-0'>{props.name}
            <div><small className='username text-secondary'>@{props.userName}</small></div></h5>
            <small className='text-secondary'><i>{props.date}</i></small>
          </div>
          <p className='text'lan="en">{props.text}<small className='link' display='none'>{props.link !== '' ? <a onClick={props.onClick} href={props.link}></a> : ''} </small>{props.picture !== '' ? <img src={props.picture} className='pic' alt='Image'/> : ''}</p>
          <div className='icons'>
            <div className='icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{props.retweets}</div>
            <div className='icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{props.likes}</div>
          </div>
        </div> 
       </div> 
      </div> 
    </div>
  )
}

export default Showcase;