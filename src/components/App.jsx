import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import logo from './styles/logo.png';
import ApptList from './ApptList';
import ApptDetails from './ApptDetails';

export default function App() {
  const [appts, setAppts] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState({});

  // gets appts from database
  useEffect(() => {
    axios.get('/appts')
      .then((results) => {
        setAppts(results.data);
      })
      .catch((err) => {
        console.log('Error getting appts: ', err);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo} alt='logo'/>
        <span className="App-name">&nbsp;Your medical planner</span>
      </div>
      <div className="App-body">
        <ApptList appts={appts} setAppts={setAppts} setSelectedAppt={setSelectedAppt}/>
        <ApptDetails appts={appts} setAppts={setAppts} selectedAppt={selectedAppt} setSelectedAppt={setSelectedAppt}/>
      </div>
    </div>
  );
}
