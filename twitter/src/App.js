import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import Home from './Home.js';
import Search from './Search.js';
import Random from './Random.js';
import './style.css';




class App extends Component {
  render () {
    return (
      <div  >
      <HashRouter>
        <div  className='navbar navbar-expand-lg navbar-dark bg-dark px-5 py-4'> 
          <ul className='navbar-nav'>
            <li className='nav-item'><NavLink className='nav-link' to ='/'>HOME</NavLink></li>
            <li className='nav-item'><NavLink className='nav-link' to ='/Search'>SEARCH</NavLink></li>
            <li className='nav-item'><NavLink className='nav-link' to ='/Random'>RANDOM</NavLink></li>
          </ul>
        </div>
          <div>
            <Route exact path ='/' component={Home} />
            <Route path ='/Search' component={Search} />
            <Route path ='/Random' component={Random} />
          </div>
      </HashRouter>
      </div>
    )
  }
}

export default App;