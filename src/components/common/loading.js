import {useEffect, useState} from 'react';

export const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-wrapper">
      <div className="loading">
        <span>Loading{dots}</span>
      </div>
    </div>
  );
};
