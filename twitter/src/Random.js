import React from 'react';
import {useState, useEffect} from 'react';

const Random = () => {
  const [initState, setInitState] = useState([]);

  useEffect(() => {
    fetch('/api/char').then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => setInitState(jsonResponse))
  }, [])

  console.log(initState)
  return (
    <div>
      <button onClick={initState}/>
    </div>
  )
}

export default Random;