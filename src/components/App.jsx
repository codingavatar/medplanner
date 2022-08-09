import { useState, useEffect } from 'react';
import './assets/App.css';
import Appts from './Appts.jsx';
import ConditionList from './ConditionList.jsx';
import logo from './assets/logo.png';

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo} alt='logo'/>
        Your medical planner
      </div>

      <div className="App-body">
        <Appts/>
        <ConditionList/>
      </div>
    </div>
  );
}
