import React, { FC, useEffect, useState } from 'react';
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
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const router = useRouter();
  const hasActiveLink = Object.values(social).some((link) => link.isActive);

  const languages = [
    { code: 'en', label: 'EN', url: 'https://ica-events.com' },
    { code: 'tr', label: 'TR', url: 'https://tr.ica-events.com' },
    { code: 'cn', label: 'CN', url: 'https://cn.ica-events.com' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const matchedLang = languages.find((lang) => hostname.startsWith(lang.code));
      setCurrentLanguage(matchedLang ? matchedLang.code : 'en');
    }
  }, []);

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
                <div className="language-links">
                  {languages.map((lang) => (
                    <Link href={lang.url} key={lang.code}>
                      <a
                        aria-label={lang.label}
                        className={lang.code === currentLanguage ? 'current-lang' : undefined}
                      >
                        {lang.label}
                      </a>
                    </Link>
                  ))}
                </div>
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
