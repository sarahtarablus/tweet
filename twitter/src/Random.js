import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const Random = (props) => {
  const [initState, setInitState] = useState({});

  const getAndy = async () => {
  
    await axios.get('/api')
      .then(res => console.log(res))
      .catch(err => console.log(err))
        // const response = res.data;
        // setInitState((prev) => ({
        //   ...prev,
        //   response
        // }))
        //console.log(initState)
            
    }
  
  return (
    <div className='random'>
      <button onClick={getAndy}>Andy Sterkowitz</button>
    </div>
  )
}

export default Random;