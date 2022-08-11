import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Condition from './Condition.jsx';

export default function ConditionList({ appts, selectedAppt }) {
  const [conditions, setConditions] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState(true);

  // gets conditions for selected appt and if new condition gets added
  useEffect(() => {
    axios.get(`appts/${selectedAppt._id}`)
      .then((results) => {
        setConditions(results.data);
      })
      .catch((err) => {
        console.log('Error getting conditions: ', err);
      });
  }, [selectedAppt, newlyAdded]);

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
              newlyAdded={newlyAdded}
              setNewlyAdded={setNewlyAdded}
            />);
        })
        : <div>↓ Search for conditions to add info</div>
      }
      <Search setConditions={setConditions}
        appts={appts}
        selectedAppt={selectedAppt}
        newlyAdded={newlyAdded}
        setNewlyAdded={setNewlyAdded}/>
    </div>
  );
}
