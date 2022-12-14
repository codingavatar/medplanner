import { useState } from 'react';
import axios from 'axios';

export default function ApptForm({ triggered, setTriggered, appts, setAppts }) {
  const [date, setDate] = useState(Date());
  const [dr, setDr] = useState('');
  const [location, setLocation] = useState('');
  const [questions, setQuestions] = useState('');

  const submitAppt = function(e) {
    e.preventDefault();
    let data = {
      'date': date,
      'dr': dr,
      'location': location,
      'questions': questions
    };
    axios.post('/appts', data)
      .then((appt) => {
        // closes form
        setTriggered(false);
        // get all appts
        axios.get('/appts')
          .then((results) => {
            setAppts(results.data);
            // resets form values
            setDate(Date());
            setDr('');
            setLocation('');
            setQuestions('');
          })
          .catch((err) => {
            console.log('Error getting appts: ', err);
          });
      })
      .catch((err) => {
        // does not close form or reset values if error
        console.log('Error creating appointment: ', err);
      });
  };

  const handleCancel = function() {
    setTriggered(false);
    // resets form values
    setDate(Date());
    setDr('');
    setLocation('');
    setQuestions('');
  };

  return (triggered) ? (
    <div className="ApptForm">
      <div className="background">
        <div className="popup">
          <h3>Enter a new appointment</h3>
          <form onSubmit={(e) => submitAppt(e)}>
            <div>
              <label>Date and time of appointment: </label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => {setDate(e.target.value)}}
              />
            </div>
            <div>
              <label>Dr: </label>
              <input
                type="text"
                autoComplete="off"
                value={dr}
                onChange={(e) => {setDr(e.target.value)}}
              />
            </div>
            <div>
              <label>Location: </label>
              <textarea
                className="location-input"
                type="text"
                autoComplete="off"
                value={location}
                onChange={(e) => {setLocation(e.target.value)}}
              />
            </div>
            <div>
              <label>Questions: </label>
              <textarea
                autoComplete="off"
                value={questions}
                onChange={(e) => {setQuestions(e.target.value)}}
              />
            </div>
            <button type="submit">Save and Close</button>
            &nbsp;
            <button onClick={() => handleCancel()}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  ) : undefined;
}