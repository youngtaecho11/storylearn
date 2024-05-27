import { useState, useEffect, useRef } from 'react';
const useTimer = () => {
    const [time, setTime] = useState(0);
    const [timeArray, setTimeArray] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    const resetTimer = () => {
        setTime(0);
    };

    const resetTimerAndInsert = () => {
        setTime(0);
        setTimeArray(prevArray => [...prevArray, time]);
    };

    return { time, timeArray, resetTimer, resetTimerAndInsert };
};
export default useTimer;