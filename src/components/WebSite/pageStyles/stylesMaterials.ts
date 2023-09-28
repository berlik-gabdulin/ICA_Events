import styled from '@emotion/styled';
import customTheme from 'src/theme/customTheme';

export const MaterialTitle = styled.h3`
  font-size: 52px;
  color: ${customTheme.light[100]};
  @media screen and (max-width: 1600px) {
    font-size: 36px;
  }
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;
export const MaterialInfo = styled.span`
  font-size: 32px;
  color: ${customTheme.darker[100]};
  @media screen and (max-width: 1600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const DownloadCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 50px;
  margin-bottom: 90px;
  background-color: #fff;
  box-shadow: 0 0 21px rgba(4, 78, 78, 0.1);
  @media screen and (max-width: 1600px) {
    padding: 20px 25px;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 16px 20px;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 768px) {
    padding: 16px 16px 24px;
    margin-bottom: 32px;
    flex-direction: column;
  }

  svg {
    height: 40px;
    width: 40px;
    @media screen and (max-width: 768px) {
      height: 24px;
      width: 24px;
    }
  }
`;

export const DownloadCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 24px;
  }
`;
