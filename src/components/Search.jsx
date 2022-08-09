import { useState, useEffect } from 'react';

export default function Appts() {
  // useEffect(() => {
  //   const jqueryFile = document.createElement('jqueryScript');
  //   jqueryFile.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  //   document.body.appendChild(jqueryFile);

  //   const autocompleteFile = document.createElement('autocompleteScript');
  //   autocompleteFile.src = 'https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.3/autocomplete-lhc.min.js';
  //   document.body.appendChild(autocompleteFile);
  // });
  const [search, setSearch] = useState('');

  return (
    <div>Search
      <input
        type="text"
        id="condition"
        placeholder="Condition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  );
}
