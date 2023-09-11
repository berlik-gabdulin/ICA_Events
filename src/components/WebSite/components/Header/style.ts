import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Link from 'next/link';
import palette from 'src/theme/palette';

export const LogoBox = styled(Box)`
  padding-top: 8px;
  padding-bottom: 14px;
  img {
    width: 100%;
    max-width: 241px;
    height: auto;
  }
`;

export const SocialBox = styled(Box)`
  margin-bottom: 27px;
  justify-content: flex-end;
  padding: 0 10px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    color: #fff;
    svg {
      font-size: 26px;
    }
    &:hover {
      svg {
        color: ${palette.light.primary.light};
      }
    }
  }
`;

export const NavBox = styled.ul`
  display: flex;
  font-size: 20px;
  text-transform: uppercase;
`;

export const NavItem = styled.li`
  display: block;
  margin: 10px;
  list-style-type: none;
  &:last-of-type a {
    padding-right: 0;
  }
`;

export const NavLink = styled.a`
  position: relative;
  display: block;
  padding: 0 8px;
  color: #fff;
  text-decoration: none;
  &::after {
    content: '';
    position: absolute;
    display: block;
    margin: 5px auto 0;
    left: 0;
    right: 0;
    bottom: -16px;
    width: 50%;
    max-width: 50%;
    height: 5px;
    background-color: ${palette.light.primary.light};
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
  &:hover,
  &:focus {
    &:after {
      width: 100%;
      max-width: calc(100% - 16px);
      opacity: 1;
      bottom: -8px;
    }
  }
`;
