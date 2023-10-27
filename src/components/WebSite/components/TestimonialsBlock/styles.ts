import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Container, Arrow as RootArrow } from 'src/components/globalStyles';
import palette from 'src/theme/palette';
import { FONT_PRIMARY, FONT_PRIMARY_BOLD } from 'src/theme/typography';

export const SliderContainer = styled(Container)`
  z-index: 100;
  .slick-dots {
    bottom: 32px;

    li.slick-active {
      button:before {
        color: ${palette.light.primary.dark};
      }
    }

    button {
      &:before {
        color: ${palette.light.primary.dark};
        font-size: 20px;
      }
    }
  }
`;

export const Slide = styled(Box)`
  position: relative;
  padding: 28px 60px;
  background-color: rgba(255, 255, 255, 0.9);
  p {
    font-size: 20px;
    font-family: ${FONT_PRIMARY};
  }
`;

export const Author = styled.p`
  margin-top: 25px;
  font-size: 20px;
  font-family: ${FONT_PRIMARY_BOLD} !important;
  text-transform: uppercase;
  text-align: center;
`;

export const Arrow = styled(RootArrow)`
  svg {
    fill: #fff;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));
  }
  &.slick-next {
    right: -50px;
  }
  &.slick-prev {
    left: -50px;
  }
`;

export const QuoteImage = styled.div`
  width: 102px;
  height: 75px;
  margin-bottom: 15px;
  margin-left: -30px;
  @media screen and (max-width: 768px) {
    width: 51px;
    height: 37px;
  }
`;

export const QuoteImageRotate = styled(QuoteImage)`
  margin-top: 15px;
  margin-bottom: 0;
  margin-right: -30px;
  transform: rotate(180deg);
  margin-left: auto;
`;

export const BackgroundText = styled.div`
  width: 100%;
  max-width: 1920px;
  padding-top: calc(331 / 1975 * 100%);
  height: 0;
  left: 0;
  right: 0;
  img {
    object-fit: contain !important;
    filter: drop-shadow(0px 3px 10px rgba(4, 80, 80, 0.2));
  }
`;
export const BackgroundTextWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 30px;
  bottom: -30px;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 100;
`;
