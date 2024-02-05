import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    };

    const stopInterval = () => {
      clearInterval(intervalRef.current);
    };

    if (isRunning) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => stopInterval(); // Cleanup function
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>{formatTime(time)}</div>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handlePause} disabled={!isRunning}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;