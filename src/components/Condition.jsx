import { useState, useEffect } from 'react';
import ConditionCard from './ConditionCard';

export default function Condition({ appts, selectedAppt, condition }) {
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
      />
      <br/>
    </div>
  )
}
