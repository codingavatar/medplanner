import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConditionCard({ appts, selectedAppt, condition, triggered, setTriggered, newlyAdded, setNewlyAdded }) {
  const [notes, setNotes] = useState('');

  // updates notes field with selected appt's questions
  useEffect(() => {
    if (condition.notes.length > 0) {
      setNotes(condition.notes);
    } else {
      setNotes('');
    }
  }, [condition]);

  // adds condition to appts
  const addCondition = function(e) {
    e.preventDefault();
    let data = condition;
    data.notes = notes;
    // gets checked appts
    let checkboxes = document.getElementsByName("appt-selected");
    data.appts = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        data.appts.push(checkboxes[i].value);
      }
    }
    // updates condition in db
    axios.put(`/conditions/${condition.conditionId}`, data)
      .then((results) => {
        console.log('Updated condition: ', results.data);
        setTriggered(false);
        setNewlyAdded(!newlyAdded);
      })
      .catch((err) => {
        console.log('Error updating condition: ', err);
      })
  };

  return (triggered) ? (
    <div className="background">
      <div className="popup">
        <h3>{condition.commonName}</h3>
        <a href={condition.links.split(',')[0]} target="_blank" rel="noreferrer">
          Medline.gov link: {condition.links.split(',')[1]} </a>
        <br/>
        Synonyms: {condition.synonyms.length > 0 ? condition.synonyms : 'none'}
        <br/>
        Notes:
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
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          };
          let date = new Date(appt.date).toLocaleString('en-US', options);

          return (
            <div className="appt-checkboxes">
              <label>
              <input type="checkbox"
                name="appt-selected"
                value={appt._id}
                defaultChecked={condition.appts !== undefined ? condition.appts.indexOf(appt._id) !== -1 : false}
              />
              {date} with Dr. {appt.dr}</label>
            </div>
          );}
        )}
        <br/>
        <button onClick={(e) => addCondition(e)}>Save to appointment</button>
        &nbsp;
        <button onClick={() => setTriggered(false)}>Cancel</button>
        <br/>
      </div>
    </div>
  ) : null;
}
