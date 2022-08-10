import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Condition from './Condition.jsx';

export default function ConditionList({ appts, selectedAppt }) {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    axios.get(`appts/${selectedAppt._id}`)
      .then((results) => {
        console.log('conditions: ', results.data);
        setConditions(results.data);
      })
      .catch((err) => {
        console.log('Error getting conditions: ', err);
      });
  }, [selectedAppt]);

  return (
    <div>
      <h3>Condition List</h3>
      { conditions.length > 0 ?
        conditions.map((condition) => {
          return (
            <Condition key={condition._id}
              appts={appts}
              selectedAppt={selectedAppt}
              condition={condition}
            />);
        })
        : <div>Search for conditions to add info</div>
      }
      <Search setConditions={setConditions} appts={appts} selectedAppt={selectedAppt}/>
    </div>
  );
}
