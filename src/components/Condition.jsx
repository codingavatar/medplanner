import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Condition({ appts, selectedAppt, condition }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    condition.notes.length > 0 ?
      setNotes(condition.notes)
      : setNotes('');
  }, [condition]);

  const addCondition = function(e) {
    e.preventDefault();
    let data = condition;
    condition.appts !== undefined ?
      condition.appts.push(selectedAppt._id)
      : condition.appts = [selectedAppt._id];
    axios.put(`/conditions/${condition.conditionId}`, data)
      .then((results) => {
        console.log('Updated condition: ', results.data);
      })
      .catch((err) => {
        console.log('Error updating condition: ', err);
      })
  };

  return (
    <div>
      {condition.commonName}
      <br/>
      {condition.links}
      <br/>
      <textarea
        placeholder="Enter notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <br/>
      Appointments:
      {appts!== undefined && appts.map((appt) => {
        let options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };
        let date = new Date(appt.date).toLocaleString('en-US', options);
        return (
          <div>
            <label>
            <input type="checkbox" />
            {date} with Dr. {appt.dr}</label>
          </div>
        );}
      )}
      <br/>
      <button onClick={(e) => addCondition(e)}>Save to appointment</button>
      <br/>
    </div>
  );
}
