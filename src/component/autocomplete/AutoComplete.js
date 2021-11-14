import React, { useState, useEffect } from 'react';
import useComponentVisible from "../../hooks/useComponentVisible";
import './AutoComplete.css';

const AutoComplete = (props) => {
    const [dictionary, setDictionary] = useState([]);
    const { options, onChange, value, onTextChange, multiValues, onRemove } = props;
    const { refSelect, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        setDictionary(options);
    }, [options]);


    const searchText = (value) => {
        setIsComponentVisible(true);
        if (value.length !== 0) {
            const filteredWords = options.filter(data => data.toLowerCase().includes(value.toLowerCase()));
            setDictionary(filteredWords);
            onTextChange(value);
        } else {
            setDictionary(options);
            onTextChange(null);
        }
    }

    const handleChange = (e) => {
        onChange([e.target.value]);
    };

    const enterToSelect = (e) => {
        if (e.keyCode === 13) {
            onChange([e.target.value]);
        }
    };

    const focusToOptions = (e) => {
        if (e.keyCode === 40) {
            e.target.blur();
            document.getElementById("selectContainer").focus();
        }
    };

    return (
        <div className={"mainContainer"}>
            <div className={"searchableContainer"}>
                <div className="multiSelectContainer">
                    {
                        multiValues.length > 0 ?
                            <div className={"selectedOptionContainer"} >
                                {
                                    multiValues.map((item, key) => {
                                        return (
                                            <span data-testid="selectedOptions"
                                                className={"selectedOptions"}>{`${item}`}
                                                <span
                                                    data-testid="removeItem"
                                                    className="cross" onClick={() => onRemove(item)}>x</span>
                                            </span>
                                        )
                                    })
                                }
                            </div> : null
                    }
                    <input
                        className={"searchInput"}
                        type='text'
                        id='searchInput'
                        data-testid="searchInput"
                        placeholder="Search.."
                        onKeyDown={focusToOptions}
                        onKeyUp={(e) => searchText(e.target.value)} />
                </div>
                {dictionary.length > 0 && value ?
                    <select
                        className={"selectContainer"}
                        multiple={true}
                        data-testid="selectContainer"
                        ref={refSelect}
                        id="selectContainer"
                        onKeyUp={enterToSelect}
                        onClick={handleChange}
                        autoFocus>
                        {
                            isComponentVisible ?
                                dictionary.map((item) => {
                                    return (
                                        <option
                                            className={"options"}
                                            value={item}>{item}</option>
                                    )
                                }) : null
                        }
                    </select> : null
                }
            </div>
        </div>
    );
}

export default AutoComplete;