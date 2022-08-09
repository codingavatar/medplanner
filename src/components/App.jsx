import { useState, useEffect } from 'react';
import './styles/App.css';
import logo from './styles/logo.png';
import ApptList from './ApptList';
import ApptDetails from './ApptDetails';

export default function App() {
  const [selectedAppt, setAppt] = useState({});

  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo} alt='logo'/>
        &nbsp;Your medical planner
      </div>
      <div className="App-body">
        <ApptList setAppt={setAppt}/>
        <ApptDetails selectedAppt={selectedAppt} setAppt={setAppt}/>
      </div>
    </div>
  );
}
