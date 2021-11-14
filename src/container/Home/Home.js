import React, { useState } from 'react';
import AutoComplete from "../../component/autocomplete/AutoComplete";
import './Home.css';

const App = () => {
  const [options, setOptions] = useState(['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada']);
  const [value, setValue] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onChange = (data) => {
    const arr = [...selectedOptions, ...data];
    setSelectedOptions(arr.filter(unique));
  };

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const onRemove = (item) => {
    const arr = arrayRemoveElement([...selectedOptions], item);
    setSelectedOptions(arr.filter(unique));
  };

  const arrayRemoveElement = (arr, item) => {
    return arr.filter((ele) => {
      return ele !== item;
    })
  }

  return (
    <div className={"homeContainer"}>
      <AutoComplete
        value={value}
        data-testid="autocomplete"
        options={options}
        onChange={onChange}
        multiValues={selectedOptions}
        onRemove={onRemove}
        onTextChange={setValue} />
    </div>
  );
}
export default App;