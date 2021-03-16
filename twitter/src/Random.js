import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const Random = (props) => {
  const [initState, setInitState] = useState({});

  const getChar = () => {
  
    axios.get('/api/char')
      .then(res => {
        const response = res.data;
        // const {name, value} = response;
        setInitState((prev) => ({
          ...prev,
         response
        }))
        console.log(initState)
      })

    
      
        
  } 
      
     
    // fetch('/api/char')
    // .then(res => res.json())
    // .then(jsonResponse => console.log(jsonResponse))
  
  

  
  return (
 
    <div>
      <button className='random' onClick={getChar}>Random search</button>
      {/* <div className='char'>{initState}</div> */}
      {/* <ul className='char'>
        {initState.map(i => <li key={i.id}>{i.name}</li>)}
      </ul> */}
    </div>
  )
}

export default Random;