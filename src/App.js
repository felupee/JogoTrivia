import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch className="App">
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
