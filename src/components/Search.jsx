import { useState } from 'react';
import axios from 'axios';

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
  const [searchResults, setSearchResults] = useState([]);
  const axiosInstance = axios.create({
    baseURL: 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/'
  });

  const handleSearch = function(e) {
    e.preventDefault();
    axiosInstance.get(`search?terms=${search}&df=primary_name,consumer_name,synonyms,info_link_data`)
      .then((results) => {
        console.log('results from search: ', results.data);
        setSearchResults(results.data);
      })
      .catch((err) => {
        console.log('Error searching: ', err);
      });
  };

  return (
    <div>
      <input
        type="text"
        id="condition"
        placeholder="Condition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
      <button onClick={(e) => {handleSearch(e)}}>Search new condition</button>
    </div>
  );
}
