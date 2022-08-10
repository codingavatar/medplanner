import { useState } from 'react';
import Appt from './Appt.jsx';
import ApptForm from './ApptForm.jsx';

export default function ApptList({ appts, setAppts, setSelectedAppt }) {
  const [addAppt, setAddAppt] = useState(false);

  return (
    <div className="ApptList">
      <div className="ApptList-add">
        <button onClick={() => setAddAppt(true)}>Add an appointment</button>
        <ApptForm
          triggered={addAppt}
          setTriggered={setAddAppt}
          setAppts={setAppts}
        />
      </div>
      <div className="ApptList-upcoming">
        <h2>Upcoming Appointments</h2>
        {appts.length > 0 ?
          <div className="ApptList-list">
            {
              appts.map((appt) =>
                <Appt appt={appt} setSelectedAppt={setSelectedAppt} key={appt._id}/>)
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
