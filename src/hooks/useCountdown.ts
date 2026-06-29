import { useEffect, useState } from 'react';

export function useCountdown(hours = 6) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = hours - (now.getHours() % hours);
      const m = 59 - now.getMinutes();
      const s = 59 - now.getSeconds();
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [hours]);

  const formatted = `${String(timeLeft.hours).padStart(2, '0')}h : ${String(timeLeft.minutes).padStart(2, '0')}m : ${String(timeLeft.seconds).padStart(2, '0')}s`;

  return { timeLeft, formatted };
}
