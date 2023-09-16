import { useState, useEffect } from 'react'

function useWindowHeight() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const handleResize = () => { setWindowHeight(window.innerHeight) };

    useEffect(() => {
        // Add event listener to track window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }); // No dependency array, so this effect runs on every component render

    return windowHeight
}

export default useWindowHeight