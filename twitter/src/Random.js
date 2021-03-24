import React, { useDebugValue } from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Random = (props) => {
  const [users, setUsers] = useState([]);


  useEffect( async () => {
    try {
      const profiles = await axios.get('/api/profile')
      .then(res => setUsers([...res.data]))
      .catch(err => console.log(err)) 
    } catch (err) {
      console.log(err)
    }
  },[])

  // const getTweets = async () => {
  //   await axios.get('/api')
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  //       // const response = res.data;
  //       // setInitState((prev) => ({
  //       //   ...prev,
  //       //   response
  //       // }))
  //       //console.log(initState)
            
  // }
  
  return (
  <div>
   {users.map((user) => {
    return  <div key={user.id} className="card" style={{width: '18rem'}}>
    <h5 className="card-title">{user.name}</h5>
    <small>{user.userName}</small>
    <img className="card-img-top rounded" src={user.image} alt="image"/>
    <a href="#" className="btn btn-dark">Tweets</a>
    </div>
   })}
  </div>
  
  )}


export default Random;