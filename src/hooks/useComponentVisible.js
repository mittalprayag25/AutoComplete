import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const refSelect = useRef(null);

    const handleClickOutside = (event) => {
        if (refSelect.current && !refSelect.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    const handleEscape = (event) => {
        if (event.code === 'Escape')
            setIsComponentVisible(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleEscape, true);
        };
    });

    return { refSelect, isComponentVisible, setIsComponentVisible };
}