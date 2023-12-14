import { ReactElement } from 'react';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';
import { HeadingStyled } from '../BGBox/styles';

export const Heading = ({
  children,
  style,
}: {
  children: string | ReactElement | ReactElement[];
  style?: any;
}): ReactElement => {
  const titleRef = useScrollAnimation('animate__fadeInDown');
  return (
    <HeadingStyled ref={titleRef} className="animate__animated" style={style}>
      {children}
    </HeadingStyled>
  );
};
