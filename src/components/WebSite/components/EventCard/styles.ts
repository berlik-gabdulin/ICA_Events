import styled from '@emotion/styled';
import palette from 'src/theme/palette';

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 650px;
  padding: 20px 20px 100px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  height: 620px;
  min-height: 100%;
  box-shadow: 0 0px 15px -4px rgba(4, 78, 78, 0.4);
  background: #ffffff;
`;

export const CardImgWrp = styled.div`
  position: relative;
  height: 0;
  padding-top: 50%;
  overflow: hidden;
  > span {
    position: absolute !important;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100% !important;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
`;

export const CardInner = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 30px 30px;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  display: block;
  margin-top: 37px;
  margin-bottom: 8px;
  font-size: 24px;
  min-height: 58px;
  line-height: 1.2;
  font-family: 'Gilroy-Semibold', sans-serif;
  color: #000000;
  @media only screen and (max-width: 991px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    margin-top: 23px;
  }
`;
export const CardText = styled.p`
  line-height: 120%;
  font-size: 20px;
  line-height: 1.2;
  color: #000000;
  height: 72px;
  margin-bottom: 50px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 991px) {
    font-size: 16px;
    min-height: auto;
  }
`;

export const CardItemDate = styled.p`
  margin-bottom: 15px;
  line-height: 1.2;
  color: #000000;
  font-size: 24px;
  height: 58px;
  font-family: 'Gilroy-Semibold', sans-serif;
  @media only screen and (max-width: 425px) {
    margin-bottom: 0;
  }
`;
export const CardItemAddress = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  margin-bottom: 31px;
`;

export const BtnStyles = {
  minWidth: '100%',
  marginTop: 0,
  height: 56,
  fontSize: 20,
  '&:hover': {
    color: palette.light.primary.dark,
    backgroundColor: 'transparent',
  },
};
