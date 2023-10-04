import styled from '@emotion/styled';
import palette from 'src/theme/palette';
import Button from '../Button';

export const Arrow = styled.span`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 41px !important;
  svg {
    display: flex !important;
    font-size: 60px !important;
    justify-content: center;
    align-items: center;
    fill: ${palette.light.primary.light};
    &:hover,
    &:focus {
      fill: ${palette.light.primary.dark};
    }
  }
  &.slick-prev {
    svg {
      transform: rotate(180deg);
    }
  }
  &.slick-disabled {
    svg {
      fill: ${palette.light.grey[500]} !important;
      &:hover,
      &:focus {
        fill: ${palette.light.grey[500]} !important;
      }
    }
  }
  &:before,
  &:after {
    display: none;
  }
`;

export const ButtonStyled = styled(Button)`
  &:hover {
    color: #fff;
  }
`;
