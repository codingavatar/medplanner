import { useState } from 'react';
import ConditionCard from './ConditionCard';

export default function Condition({ appts, selectedAppt, condition, newlyAdded, setNewlyAdded }) {
  const [expandView, setExpandView] = useState(false);

  return (
    <div className="Condition">
      <div className="Condition-small" onClick={() => setExpandView(true)}>
        {condition.commonName}
      </div>
      <ConditionCard
        key={condition.conditionId}
        appts={appts}
        selectedAppt={selectedAppt}
        condition={condition}
        triggered={expandView}
        setTriggered={setExpandView}
        newlyAdded={newlyAdded}
        setNewlyAdded={setNewlyAdded}
      />
    </div>
  )
}
