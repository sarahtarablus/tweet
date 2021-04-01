import React, { useDebugValue } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


const Uri= (props) => {
  return (
    <div>
    <Router>
      <Link to={props.link} target='_blank'>{props.link}</Link>
        <Switch>
         <Route path={props.link}></Route>
        </Switch> 
    </Router>
    </div>
  )
}

export default Uri;