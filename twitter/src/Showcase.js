import React, { useDebugValue } from 'react';
import {BrowserRouter as Router,Switch,Route,Lin} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons';
import Uri from './link.js';

const Showcase = (props) => {
  return (
    <div  key={props.id} className='d-flex align-items-center flex-column'><div className='card showcase shadow-lg'>
      <div className='media'> 
        <img src={props.image} className='rounded-circle mr-3' alt='Image'/>
        <div className='media-body'>
          <div className='name-date'>
            <h5 className='mt-0'>{props.name}
            <div><small className='username text-secondary'>@{props.userName}</small></div></h5>
            <small className='text-secondary date'><i>{props.date}</i></small>
          </div>
          <p className='text'lan="en">{props.text}<Uri link={props.link}></Uri>{props.picture !== '' ? <img src={props.picture} className='pic' alt='Image'/> : ''}</p>
          <div className='icons'>
            <div className='icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{props.retweets}</div>
            <div className='icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{props.likes}</div>
          </div>
        </div> 
       </div> 
      </div> 
    </div>
  )
  // return (
  //   <div  key={props.id} id='exemple' className='modal fade' tabIndex='-1' role='dialog'>
  //     <div className='modal-dialog' role='document'>
  //       <div className='modal-content'> 
  //         <img src={props.image} className='modal-image rounded-circle mr-3' alt='Image'/>
  //         <button type='modal' className='close' data-dismiss='modal' aria-label='Close'></button>
  //         <div className='modal-body'>
  //           <h5 className='modal-title'>{props.name}</h5>
  //           <small className='modal-username text-secondary'>@{props.userName}</small>
  //           <small className='modal-text-secondary date'><i>{props.date}</i></small>
  //         <p className='modal-text'lan="en">{props.text}
  //         {/* <Uri link={props.link}></Uri> */}
  //         {props.picture !== '' ? <img src={props.picture} className='modal-pic' alt='Image'/> : ''}</p>
  //         <div className='icons'>
  //           <div className='modal-icon text-secondary'><FontAwesomeIcon icon={faRetweet}/>{props.retweets}</div>
  //           <div className='modal-icon text-secondary'><FontAwesomeIcon icon={faHeart}/>{props.likes}</div>
  //         </div>
  //       </div> 
  //      </div> 
  //     </div> 
  //   </div>
  // )
}

export default Showcase;

//<small className='link'>{props.link !== '' ? <Link onClick={props.onClick}>{props.link}</Link> : ''} </small>