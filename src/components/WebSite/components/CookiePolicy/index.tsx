import React, { useEffect, useState } from 'react';
import { Container } from 'src/components/globalStyles';
import Button from '../Button';
import styled from '@emotion/styled';
import customTheme from 'src/theme/customTheme';
import Cookies from 'js-cookie';

const CookiePolicy: React.FC<{ text: string }> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('user-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('user-consent', 'accepted', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <Banner>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <ButtonStyled onClick={handleAccept}>Accept</ButtonStyled>
      </Container>
    </Banner>
  );
};

export default CookiePolicy;

const Banner = styled.div`
  padding: 40px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;

  color: #fff;
  background: ${customTheme.darker[100]};
  z-index: 99999;
`;

const ButtonStyled = styled(Button)`
  margin: 30px auto 0;
  padding: 4px 16px;
  font-size: 16px;
  height: 40px;
  min-width: auto;
  width: 120px;
`;
