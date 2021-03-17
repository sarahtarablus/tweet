import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const Random = (props) => {
  const [initState, setInitState] = useState({});

  
    axios.get('/api/results')
      .then(res => {
        const response = res.data;
        setInitState((prev) => ({
          ...prev,
         response
        }))
        console.log(initState)
      })      
   
  
  return (
    <div>
      <button className='random' onClick={getChar}>Random search</button>
    </div>
  )
}

export default Random;