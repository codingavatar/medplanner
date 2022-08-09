import { useState, useEffect } from 'react';
import axios from 'axios';
import ConditionList from './ConditionList.jsx';

export default function ApptDetails({ selectedAppt, setAppt }) {
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
    setQuestions(selectedAppt.questions || '');
    console.log('previous saved questions: ', selectedAppt.questions);
  }, [selectedAppt]);

  const handleSave = function(e) {
    console.log('questions: ', questions);
    let data = {
      'questions': questions
    };
    axios.put(`/appts/${selectedAppt._id}`, data)
      .then((results) => {
        let apptCopy = selectedAppt;
        apptCopy.questions = questions;
        setAppt(apptCopy);
        console.log('saved questions');
      })
      .catch((err) => {
        console.log('Error updating questions: ', err);
      })
  };

  return (
    <div className="App-details">
      <h2>Appointment Details</h2>
      {selectedAppt.dr !== undefined ?
        <div>
          {date}
          <br/>
          Dr. {selectedAppt.dr}
          <br/>
          Location: {selectedAppt.location}
          <br/>
          <textarea
            placeholder="Enter any questions about this appointment"
            value={questions}
            onChange={(e) => {setQuestions(e.target.value)}}
          />
          <br/>
          <button onClick={(e) => handleSave(e)}>Save Questions</button>
          <ConditionList selectedAppt={selectedAppt}/>
        </div>
        :
        <div>Select an appointment</div>
      }
    </div>
  );
}