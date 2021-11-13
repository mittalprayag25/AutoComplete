import React, { useState } from 'react';
import AutoComplete from "../autocomplete/AutoComplete";
import './ParentStyle.css';

const ParentComponent = () => {
    const [options, setOptions] = useState(['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iraq', 'Canada']);
    const [value, setValue] = useState(null);

    const onChange = (data) => {
        console.log(data);
    };

    return (
        <div className={"parentContainer"}>
            <AutoComplete
                value={value}
                options={options}
                onChange={onChange}
                onTextChange={setValue} />

        </div>
    );
}
export default ParentComponent;