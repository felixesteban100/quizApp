import { useState, useEffect } from 'react'

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => { setWindowWidth(window.innerWidth) };

    useEffect(() => {
        // Add event listener to track window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }); // No dependency array, so this effect runs on every component render

    return windowWidth
}

export default useWindowWidth