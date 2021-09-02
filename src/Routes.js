import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {LandingPage, NHLHomePage} from './Pages';


export default function Routes() {
    return (
    <Router>
        <Switch>
            <Route exact path="/">
            <LandingPage />
            </Route>
            <Route exact path="/NHL">
            <NHLHomePage />
            </Route>
        </Switch>
    </Router>    
    )
}
