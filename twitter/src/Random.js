import React, { useDebugValue } from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Random = (props) => {
  const [users, setUsers] = useState([]);

  const profilesUsers = [
    {id:80774161,name:"Adrian Younge",userName:"AdrianYounge",image:"http://pbs.twimg.com/profile_images/931210786021580800/Hldm3_9__normal.jpg"},
    {id:44196397,name:"Elon Musk",userName:"elonmusk",image:"http://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_normal.jpg"},
    {id:20536157,name:"Google",userName:"Google",image:"http://pbs.twimg.com/profile_images/1343584679664873479/Xos3xQfk_normal.jpg"},
    {id:95092020,name:"Dr Jordan B Peterson",userName:"jordanbpeterson",image:"http://pbs.twimg.com/profile_images/839626059633029121/Wjk366Md_normal.jpg"},
    {id:110365072, name:"Gordon Ramsay",userName:"GordonRamsay",image:"http://pbs.twimg.com/profile_images/1349755150316040194/VpUCtbH8_normal.jpg"},
  ];

  // useEffect( async () => {
  //   try {
  //     const profiles = await axios.get('/api/profile')
  //     .then(res => setUsers([...res.data]))
  //     .catch(err => console.log(err)) 
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },[])
  useEffect(() => {
    setUsers([...profilesUsers])
  })

  const getTweets = async () => {
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
  <div>
   {users.map((user) => {
    return  <div key={user.id} className="card ran">
    <h5 className="card-title">{user.name}</h5>
    <small>@{user.userName}</small>
    <img className="card-img-top rounded" src={user.image} alt="image"/>
    {/* <a href="#" className="btn btn-dark">Get Tweets</a> */}
    </div>
   })}
  </div>
 )}


export default Random;