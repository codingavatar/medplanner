import React from 'react';

export default function Appt({ appt, setSelectedAppt }) {
  // options to display date
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
    <div className="Appt" onClick={() => {setSelectedAppt(appt)}}>
      <div className="Appt-date-dr">
        <div>{date}</div>
        &nbsp; with Dr. {appt.dr}
      </div>
      <br/>
    </div>
  )
}