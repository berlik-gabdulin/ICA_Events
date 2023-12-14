import React, { ReactElement } from 'react';
import { useAnimatedValue } from 'src/utils/useAnimatedValue';

export const AnimatedBulletValue = ({ value }: { value: string }): ReactElement => {
  const numericValue = parseInt(value.split('+')[0]);
  const animatedValue = useAnimatedValue(numericValue);

  return (
    <>
      {value.includes('+') ? (
        <>
          {animatedValue}
          <span>+</span>
        </>
      ) : (
        animatedValue
      )}
    </>
  );
};
