import { useState, useEffect } from 'react';

export const useAnimatedValue = (endValue: number, duration = 1500, step = 10): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let currentStep = 0;
    const totalSteps = duration / step;
    const valueIncrement = endValue / totalSteps;
    let currentValue = 0;

    const interval = setInterval(() => {
      currentStep++;
      currentValue += valueIncrement;

      setValue(currentValue);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setValue(endValue);
      }
    }, step);

    return () => clearInterval(interval); // Очистка на размонтировании
  }, [endValue, step, duration]);

  return Math.round(value);
};
