import React from 'react';

export default function Appt({ appt, setAppt }) {
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
    <div className="Appt" onClick={() => {setAppt(appt)}}>
      {date} with Dr. {appt.dr}
    </div>
  )
}