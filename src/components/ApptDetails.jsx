import { useState, useEffect } from 'react';
import axios from 'axios';
import ConditionList from './ConditionList.jsx';

export default function ApptDetails({ appts, setAppts, selectedAppt, setSelectedAppt }) {
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState('');

  useEffect(() => {
    // options to display date
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    if (selectedAppt.date !== undefined) {
      setDate(new Date(selectedAppt.date).toLocaleString('en-US', options));
    }
    // updates question field with selected appt's questions
    setQuestions(selectedAppt.questions || '');
  }, [selectedAppt]);

  // saves questions
  const handleSave = function(e) {
    e.preventDefault();
    let data = {
      'questions': questions
    };
    axios.put(`/appts/${selectedAppt._id}`, data)
      .then((results) => {
        // update questions locally
        let apptCopy = selectedAppt;
        apptCopy.questions = questions;
        setSelectedAppt(apptCopy);
      })
      .catch((err) => {
        console.log('Error updating questions: ', err);
      })
  };

  // deletes currently selected appt
  const handleDelete = function(e) {
    e.preventDefault();
    let confirmed = window.confirm('Do you really want to delete this appointment?');
    if (confirmed) {
      axios.delete(`/appts/${selectedAppt._id}`)
        .then(() => {
          // remove current appt locally
          let apptsCopy = appts.filter((appt) => appt._id !== selectedAppt._id);
          console.log('removed appt: ', apptsCopy);
          setAppts(apptsCopy);
          setSelectedAppt({});
        })
        .catch((err) => {
          console.log('Error deleting appointment: ', err);
        });
    } else {
      console.log('Appt not deleted');
    }
  };

  return (
    <div className="ApptDetails">
      <br/>
      <h2>Appointment Details</h2>
      {selectedAppt.dr !== undefined ?
        <div>
          {date}
          <br/>
          Dr. {selectedAppt.dr}
          <br/>
          Location: {selectedAppt.location}
          <br/>
          Questions:
          <br/>
          <textarea
            placeholder="Enter any questions about this appointment"
            value={questions}
            onChange={(e) => {setQuestions(e.target.value)}}
          />
          <br/>
          <button onClick={(e) => handleSave(e)}>Save Questions</button>
          &nbsp;&nbsp;&nbsp;
          <button className="delete-appt-button" onClick={(e) => handleDelete(e)}>Delete appointment</button>
          <ConditionList appts={appts} selectedAppt={selectedAppt}/>
        </div>
        :
        <div>← Select an appointment</div>
      }
    </div>
  );
}
