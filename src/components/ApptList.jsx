import { useState, useEffect } from 'react';
import axios from 'axios';
import Appt from './Appt.jsx';
import ApptForm from './ApptForm.jsx';

export default function ApptList({ setAppt }) {
  const [appts, setAppts] = useState([]);
  const [addAppt, setAddAppt] = useState(false);

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
    <div className="ApptList">
      <div className="ApptList-add">
        <button onClick={() => setAddAppt(true)}>Add an appointment</button>
        <ApptForm triggered={addAppt} setTriggered={setAddAppt} setAppts={setAppts}/>
      </div>
      <div className="ApptList-upcoming">
        <h2>Upcoming Appointments</h2>
        {appts.length > 0 ?
          <div className="ApptList-list">
            {
              appts.map((appt) =>
                <Appt appt={appt} setAppt={setAppt} key={appt._id}/>)
            }
          </div>
          :
          <div className="ApptList-none">
            No appointments. Please add an appointment
          </div>
        }
      </div>
    </div>
  );
}
