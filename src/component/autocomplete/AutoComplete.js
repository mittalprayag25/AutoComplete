import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

const AutoComplete = (props) => {
    const [dictionary, setDictionary] = useState([]);
    const { options, onChange, value, onTextChange } = props;

    useEffect(() => {
        setDictionary(options);
    }, [options]);

    const handleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
        onChange(selectedOptions);
    }

    const searchText = (value) => {
        if (value.length !== 0) {
            const filteredWords = options.filter(data => data.toLowerCase().includes(value.toLowerCase()));
            setDictionary(filteredWords);
            onTextChange(value);
        } else {
            setDictionary(options);
            onTextChange(null);
        }
    }


    return (
        <div className={"mainContainer"}>
            <div className={"searchableContainer"}>
                <input className={"searchInput"}
                    type='text'
                    placeholder="Search Country"
                    onKeyUp={(e) => searchText(e.target.value)} />
                {dictionary.length > 0 && value ?
                    <select
                        className={"selectContainer"}
                        multiple={true}
                        onChange={handleChange}>
                        {
                            dictionary.map((item) => {
                                return (
                                    <option className={"options"} value={item}>{item}</option>
                                )
                            })
                        }
                    </select> : null
                }
            </div>
        </div>
    );
}

export default AutoComplete;