import  { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const SecondsCounter = ({ seconds }) => {
  // Convert seconds to individual digits (6 digits total)
  const formatSeconds = (secs) => {
    const timeStr = Math.abs(secs).toString().padStart(6, '0');
    return timeStr.split('');
  };

  const digits = formatSeconds(seconds);

  return (
    <div className="container text-center p-5 m-5 fs-1 bg-black">
        <div className='d-inline-flex align-items-center text-bg-primary' >
        ⏱️
        
        {/* Digits */}
        {digits.map((digit, index) => (
          <div key={index} className='col p-4 m-5 text-bg-primary' >
            {digit}
          </div>
        ))}
        </div>

      </div>
  );
};


const Home = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [alertTime, setAlertTime] = useState('');
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = isCountdown ? prevSeconds - 1 : prevSeconds + 1;
          
          // Check for alert
          if (alertTime && !hasAlerted && newSeconds === parseInt(alertTime)) {
            alert(`Time reached: ${alertTime} seconds!`);
            setHasAlerted(true);
          }
          
          // Stop countdown at 0
          if (isCountdown && newSeconds <= 0) {
            setIsRunning(false);
            return 0;
          }
          
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isCountdown, alertTime, hasAlerted]);


  return (
    <>
        <SecondsCounter seconds={seconds} />

    </>
  );
};

// Render the component using ReactDOM.createRoot
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Home />);
}

export default Home;