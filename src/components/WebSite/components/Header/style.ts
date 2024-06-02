import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import customTheme from 'src/theme/customTheme';
import { NavLinkProps } from 'src/utils/types';

export const LogoBox = styled.div`
  display: flex;
  flex-grow: 1;
  padding-top: 8px;
  padding-bottom: 14px;
  img {
    width: 100%;
    max-width: 241px;
    height: auto;
  }
`;

export const SocialBox = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: flex-end;
  padding: 0 10px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    color: #fff;
    svg {
      height: 24px;
    }
    &:hover {
      svg {
        color: ${customTheme.light[100]};
      }
    }
  }
  .language-links {
    display: flex;
    margin-left: 20px;
  }

  .language-links a {
    margin-right: 10px;
    text-decoration: none;
    font-weight: 600;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  .current-lang {
    color: ${customTheme.light[100]};
  }
`;

export const NavBox = styled.ul`
  display: flex;
  font-size: 20px;
  text-transform: uppercase;
`;
export const MenuBox = styled(Box)`
  @media screen and (max-width: 1010px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  position: relative;
  display: block;
  margin: 10px;
  list-style-type: none;
  &:last-of-type a {
    padding-right: 0;
  }

  &:hover {
    > div {
      visibility: visible;
      transform: translate(-50%, 0);
      @media screen and (max-width: 1010px) {
        padding-top: 15px;
        transform: translate(0, 0);
      }
    }
  }
`;

export const NavLink = styled.a<NavLinkProps>`
  position: relative;
  display: block;
  padding: 0 8px;
  color: #fff;
  text-decoration: none;
  @media screen and (max-width: 1010px) {
    padding: 4px 8px;
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    margin: 5px auto 0;
    left: 0;
    right: 0;
    bottom: ${(props) => (props.isActive ? '-8px' : '-16px')};
    width: ${(props) => (props.isActive ? '100%' : '50%')};
    max-width: ${(props) => (props.isActive ? 'calc(100% - 16px)' : '50%')};
    height: 5px;
    background-color: ${customTheme.light[100]};
    opacity: ${(props) => (props.isActive ? '1' : '0')};
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

export const MenuButton = styled(IconButton)`
  display: none;

  @media screen and (max-width: 1010px) {
    display: block;
  }
`;

export const SubNav = styled.div`
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 50%;
  width: 300px;
  padding: 12px;
  background: ${customTheme.darker[80]};
  transform: translate(-50%, 40px);
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  z-index: 1500;
  a {
    margin: 10px;
    color: #fff !important;
    padding: 4px 2px;
    &:after {
      display: none;
    }
    &:hover {
      color: ${customTheme.light[100]} !important;
    }
  }
`;
