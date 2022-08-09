import { useState, useEffect } from 'react';
import Search from './Search.jsx';
import Condition from './Condition.jsx';

export default function ConditionList() {
  return (
    <div>
      <div>Condition List</div>
      <Search/>
      <Condition/>
    </div>
  );
}
