import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LandingPage, NHLHomePage } from './Pages';

import { NHLPlayerToPlayer } from './Pages/PlayerToPlayer';

import NHLTeamToTeam from './Pages/TeamToTeam/NHL';

import AboutUs from './Pages/about/AboutUs';

import NotFound from './Pages/NotFound';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/NHL'>
          <NHLHomePage />
        </Route>
        <Route exact path='/NHL/players'>
          <NHLPlayerToPlayer />
        </Route>
        <Route exact path='/NHL/teams'>
          <NHLTeamToTeam />
        </Route>
        <Route exact path='/aboutus'>
          <AboutUs />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
