import { ReactElement } from 'react';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';
import { TitleH1Styled } from 'src/components/globalStyles';

export const TitleH1 = ({
  children,
  style,
}: {
  children: string | ReactElement | ReactElement[];
  style?: any;
}): ReactElement => {
  const titleRef = useScrollAnimation('animate__fadeInUp');
  return (
    <TitleH1Styled ref={titleRef} className="animate__animated" style={style}>
      {children}
    </TitleH1Styled>
  );
};
