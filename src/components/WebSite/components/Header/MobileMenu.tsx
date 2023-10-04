import React, { FC, useState } from 'react';
import { Drawer, List, Paper } from '@mui/material';
import { TNavigation, TSocialLinks } from 'src/utils/types';
import { MenuButton, NavItem, NavLink, SocialBox } from './style';
import Link from 'next/link';
import { useRouter } from 'next/router';
import customTheme from 'src/theme/customTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import styled from '@emotion/styled';

const MobileMenu: FC<{
  open: boolean;
  onClose: () => void;
  navigation: TNavigation;
  social: TSocialLinks;
}> = ({ open, onClose, navigation, social }) => {
  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <CustomPaper style={{ backgroundColor: '#044e4e' }}>
        <MenuButton
          edge="end"
          color="inherit"
          onClick={onClose}
          style={{
            color: '#fff ',
            alignSelf: 'right',
            marginLeft: 'auto',
            marginRight: 15,
            marginTop: 15,
          }}
        >
          <CloseIcon
            style={{
              width: 30,
              height: 30,
            }}
          />
        </MenuButton>
        <List>
          {navigation.map((item, index) =>
            item.isActive ? (
              <NavItem
                key={item.path}
                style={{
                  opacity: 0,
                  animation: `bounceLeft 0.6s ease ${index * 0.1}s forwards`,
                  animationDelay: `${open ? index * 0.1 : 0}s`,
                }}
              >
                <Link passHref href={item.path}>
                  <NavLink
                    isActive={router.pathname === item.path}
                    onClick={() => toggleSubMenu(index)}
                  >
                    {item.label}
                  </NavLink>
                </Link>
                {item.subMenu && item.subMenu.length > 0 && openSubMenu === index && (
                  <SubNav className={openSubMenu === index ? 'open' : ''}>
                    {item.subMenu.map((subItem) =>
                      subItem.isActive ? (
                        <Link passHref href={subItem.path} key={subItem.path}>
                          <NavLink
                            isActive={router.pathname === subItem.path}
                            style={{ color: '#000' }}
                          >
                            {subItem.label}
                          </NavLink>
                        </Link>
                      ) : null
                    )}
                  </SubNav>
                )}
              </NavItem>
            ) : null
          )}
        </List>
        <SocialBox
          style={{
            justifyContent: 'flex-start',
            opacity: 0,
            animation: `bounceTop 0.6s ease 1.2s forwards`,
            animationDelay: '1.3s', // Добавьте задержку при открытии
          }}
        >
          {social?.linkedin?.isActive ? (
            <Link href={social?.linkedin?.url}>
              <a target="_blank" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </Link>
          ) : null}
          {social?.youtube?.isActive ? (
            <Link href={social?.youtube?.url}>
              <a target="_blank" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </Link>
          ) : null}
          {social?.facebook?.isActive ? (
            <Link href={social?.facebook?.url}>
              <a target="_blank" aria-label="facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </Link>
          ) : null}
          {social?.instagram?.isActive ? (
            <Link href={social?.instagram?.url}>
              <a target="_blank" aria-label="instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </Link>
          ) : null}
        </SocialBox>
      </CustomPaper>
    </Drawer>
  );
};

export default MobileMenu;

const CustomPaper = styled(Paper)`
  background-color: ${customTheme.dark[100]} !important;
  height: 100%;
  border-radius: 0;
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
    70% {
      opacity: 0.7;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes bounceLeft {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    60% {
      opacity: 0.4;
      transform: translateX(-5%);
    }
    80% {
      opacity: 0.6;
      transform: translateX(3%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  @keyframes bounceTop {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    60% {
      opacity: 0.4;
      transform: translateY(-5%);
    }
    80% {
      opacity: 0.6;
      transform: translateY(3%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const SubNav = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 20px;
  opacity: 0;
  max-height: 0;
  background-color: ${customTheme.light[20]};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &.open {
    opacity: 1;
    max-height: 500px; // Вы можете изменить это значение в зависимости от вашего дизайна
  }

  a {
    color: #fff !important;
    text-decoration: none;
    margin-bottom: 10px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffd700; // Вы можете изменить цвет на любой, который вам нравится
    }
  }
`;
