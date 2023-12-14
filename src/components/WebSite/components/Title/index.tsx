import { ReactElement } from 'react';
import { TitleStyled } from 'src/components/globalStyles';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

export const Title = ({
  children,
  style,
}: {
  children: string | ReactElement | ReactElement[];
  style?: any;
}): ReactElement => {
  const titleRef = useScrollAnimation('animate__fadeInUp');
  return (
    <TitleStyled ref={titleRef} className="animate__animated" style={style}>
      {children}
    </TitleStyled>
  );
};
