import React, { Component } from 'react'
import {  BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history'
import Routes  from '../routes/index'

const history = createBrowserHistory();

// Base of the app
export default class App extends Component {
	
    render() {
        return (        
		  <Router history={history}>	
			 <Routes />		
		  </Router>
        )
    }
}