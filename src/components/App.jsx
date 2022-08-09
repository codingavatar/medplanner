import { useState, useEffect } from 'react';
import './styles/App.css';
import ApptList from './ApptList.jsx';
import ConditionList from './ConditionList.jsx';
import logo from './styles/logo.png';

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
        {selectedAppt.dr !== undefined ?
          <div>Selected Appt: {selectedAppt.dr}
          <ConditionList selectedAppt={selectedAppt}/>
          </div>
          :
          <div>Select an appointment</div>
        }

      </div>
    </div>
  );
}
