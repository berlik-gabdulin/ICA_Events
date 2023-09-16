import React, { FC, useState } from 'react';
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
import { LogoBox, MenuBox, MenuButton, NavBox, NavItem, NavLink, SocialBox } from './style';
import Link from 'next/link';
import { Container } from 'src/components/globalStyles';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';
import { TNavigation, TSocialLinks } from 'src/utils/types';

const Header: FC<{ social: TSocialLinks; navigation: TNavigation }> = ({ social, navigation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const hasActiveLink = Object.values(social).some((link) => link.isActive);

  return (
    <AppBar position="static" style={{ backgroundColor: '#044e4e' }}>
      <Container>
        <Toolbar style={{ padding: 0 }}>
          <LogoBox display="flex" flexGrow={1}>
            <Link href="/" passHref>
              <a>
                <Image src={Logo} width={241} height={163} alt="ICA Events" priority />
              </a>
            </Link>
          </LogoBox>
          <MenuButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon
              style={{
                width: 30,
                height: 30,
              }}
            />
          </MenuButton>
          <MenuBox display="flex" flexDirection="column">
            {hasActiveLink ? (
              <SocialBox display="flex">
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
            <NavBox>
              {navigation.map((item) =>
                item.isActive ? (
                  <NavItem key={item.path}>
                    <Link passHref href={item.path}>
                      <NavLink isActive={router.pathname === item.path}>{item.label}</NavLink>
                    </Link>
                  </NavItem>
                ) : null
              )}
            </NavBox>
          </MenuBox>
        </Toolbar>
      </Container>
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        social={social}
      />
    </AppBar>
  );
};

export default Header;
