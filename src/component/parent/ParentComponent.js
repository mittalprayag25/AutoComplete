import React, { useState } from 'react';
import AutoComplete from "../autocomplete/AutoComplete";
import './ParentStyle.css';

const ParentComponent = () => {
    const [options, setOptions] = useState(['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada']);
    const [value, setValue] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onChange = (data) => {
        const arr = [...selectedOptions, ...data];
        setSelectedOptions(arr.filter(unique));
    };

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    const onRemove = (item) => {
        console.log("ONREMOVE", item);
        const arr = arrayRemoveElement([...selectedOptions], item);
        setSelectedOptions(arr.filter(unique));
    };

    const arrayRemoveElement = (arr, item) => {
        return arr.filter((ele) => {
            return ele !== item;
        })
    }

    return (
        <div className={"parentContainer"}>
            <AutoComplete
                value={value}
                options={options}
                onChange={onChange}
                multiValues={selectedOptions}
                onRemove={onRemove}
                onTextChange={setValue} />

        </div>
    );
}
export default ParentComponent;