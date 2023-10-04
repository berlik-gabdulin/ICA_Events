import React, { FC, useState } from 'react';
import { LogoBox, MenuBox, MenuButton, NavBox, NavItem, NavLink, SocialBox, SubNav } from './style';
import { useRouter } from 'next/router';
import { AppBar, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Logo from '/public/logo/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'src/components/globalStyles';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';
import { TNavigation, TSocialLinks } from 'src/utils/types';
import useResponsive from 'src/hooks/useResponsive';

const Header: FC<{ social: TSocialLinks; navigation: TNavigation }> = ({ social, navigation }) => {
  const isMobile = useResponsive('down', 'md');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const hasActiveLink = Object.values(social).some((link) => link.isActive);

  return (
    <AppBar position="static" style={{ backgroundColor: '#044e4e' }} className="header">
      <Container>
        <Toolbar style={{ padding: 0 }}>
          <LogoBox>
            <Link href="/" passHref>
              <a>
                <Image src={Logo} width={150} height={120} alt="ICA Events" priority />
              </a>
            </Link>
          </LogoBox>
          {isMobile ? (
            <MenuButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </MenuButton>
          ) : null}
          <MenuBox display="flex" flexDirection="column">
            {hasActiveLink ? (
              <SocialBox className="SocialBox">
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
            ) : null}
            <NavBox className="NavBox">
              {navigation.map((item) =>
                item.isActive ? (
                  <NavItem key={item.path}>
                    <Link passHref href={item.path}>
                      <NavLink isActive={router.pathname === item.path}>{item.label}</NavLink>
                    </Link>
                    {item.subMenu && item.subMenu.length > 0 && (
                      <SubNav>
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
            </NavBox>
          </MenuBox>
        </Toolbar>
      </Container>
      {isMobile ? (
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navigation={navigation}
          social={social}
        />
      ) : null}
    </AppBar>
  );
};

export default Header;
