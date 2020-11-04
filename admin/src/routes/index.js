import React from "react";
import { Switch, Route } from "react-router-dom";


import HomeScreen from "../containers/Home/HomeScreen";

export default function Routes() {
  return (	  
	<Switch>
	  <Route path="/" exact component={HomeScreen} />	 
	  {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
	  <Route component={HomeScreen} />			   
	</Switch>		
  );
}
