import { useState, useEffect } from 'react';

export function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Текущая дата: {dateTime.toLocaleDateString()}</p>
      <p>Текущее время: {dateTime.toLocaleTimeString()}</p>
    </div>
  );
}