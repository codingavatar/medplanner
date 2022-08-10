import { useState, useEffect } from 'react';
import axios from 'axios';
import ConditionCard from './Condition.jsx';

export default function Search({setConditions, appts, selectedAppt}) {
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
  const [searchIds, setSearchIds] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [count, setCount] = useState(5);
  const axiosInstance = axios.create({
    baseURL: 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/'
  });

  useEffect(() => {
    // reset search results
    setSearch('');
    setSearchResults([]);
  }, [selectedAppt])

  const handleSearch = function(e, getMore) {
    e.preventDefault();

    let tempCount = count;
    if (getMore) {
      setCount(count + 5);
      tempCount = tempCount + 5;
    } else {
      setCount(5);
      tempCount = 5;
    }
    // if nothing searched, reset searchResults and not perform search
    if (search === '') {
      setSearchResults([]);
    } else {
      axiosInstance.get(`search?terms=${search}&maxList=${tempCount}&df=consumer_name,synonyms,info_link_data`)
        .then((results) => {
          if (results.data[3].length < results.data[0]) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          setSearchResults(results.data[3]);
          setSearchIds(results.data[1]);
        })
        .catch((err) => {
          console.log('Error searching: ', err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={(e) => {handleSearch(e, false)}}>
        <input
          type="text"
          id="condition"
          placeholder="Condition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        <button type="submit">Search new condition</button>
      </form>
      <br/>
      {searchResults.length > 0 ?
        <div className="searchList">
          {searchResults.map((conditionArray, index) => {
            // condition is array so need to construct it into an object
            let condition = {};
            condition.conditionId = searchIds[index];
            condition.commonName = conditionArray[0];
            condition.synonyms = conditionArray[1];
            condition.links = conditionArray[2];
            condition.notes = '';
            return (
              <ConditionCard
                key={condition.conditionId}
                appts={appts}
                selectedAppt={selectedAppt}
                condition={condition}/>
            );
          })}
          {hasMore &&
            <button onClick={(e) => handleSearch(e, true)}>See more results</button>
          }
        </div>
      : undefined
      }
    </div>
  );
}
