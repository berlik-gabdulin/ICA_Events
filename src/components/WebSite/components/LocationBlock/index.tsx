import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Map from 'src/utils/mapData';
import { eurasia, countries } from 'src/utils/network';
import { Tooltip } from '@mui/material';
import customTheme from 'src/theme/customTheme';
import { PopoverStyled, SectionLocation } from './styles';
import { TEvents, TLocationTab } from 'src/utils/types';
import Link from 'next/link';
import { Container } from 'src/components/globalStyles';
import { Title } from '../Title';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

const LocationBlock: React.FC<TLocationTab & TEvents> = ({ title, events }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isSvgVisible, setIsSvgVisible] = useState<boolean>(false);
  const svgRef = useRef(null);

  const onCountryClick = (event: MouseEvent<SVGPathElement>, country: string) => {
    setSelectedCountry(country);
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredLocations = Map.locations.filter((location) => eurasia.includes(location.name));
  const countryEvents = selectedCountry
    ? events.filter((event) => event.country === selectedCountry)
    : [];

  const mapRef = useScrollAnimation('animate__fadeIn', 200, 500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSvgVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SectionLocation ref={svgRef}>
      <Container>
        <Title style={{ color: customTheme.main[100] }}>{title}</Title>
        {isSvgVisible && (
          <svg viewBox={Map.viewBox} className="svg-map" ref={mapRef}>
            {filteredLocations.map((location) => {
              const isOurNetwork = countries.includes(location.name);

              return isOurNetwork ? (
                <Tooltip
                  title={`${location.name} - ${
                    isOurNetwork && location.name !== 'United Kingdom' ? 'Available' : 'No events'
                  }`}
                  key={location.id}
                >
                  <path
                    d={location.path}
                    className={`svg-map__location ${isOurNetwork ? 'svg-map__location-ica' : ''}`}
                    onClick={(e) =>
                      isOurNetwork &&
                      location.name !== 'United Kingdom' &&
                      onCountryClick(e, location.name)
                    }
                    style={
                      isOurNetwork
                        ? {
                            fill:
                              selectedCountry === location.name
                                ? customTheme.light[100]
                                : customTheme.main[100],
                            cursor: 'pointer',
                            stroke: customTheme.light[20],
                            strokeWidth: '0.3px',
                          }
                        : {
                            fill: '#aeaeae',
                            cursor: 'default',
                            stroke: '#5b5b5b',
                            strokeWidth: '0.3px',
                          }
                    }
                  />
                </Tooltip>
              ) : (
                <path
                  d={location.path}
                  key={location.id}
                  className={`svg-map__location ${isOurNetwork ? 'svg-map__location-ica' : ''}`}
                  onClick={(e) => isOurNetwork && onCountryClick(e, location.name)}
                  style={
                    isOurNetwork
                      ? {
                          fill:
                            selectedCountry === location.name
                              ? customTheme.light[100]
                              : customTheme.main[100],
                          cursor: 'pointer',
                          stroke: customTheme.light[20],
                          strokeWidth: '0.3px',
                        }
                      : {
                          fill: '#aeaeae',
                          cursor: 'default',
                          stroke: '#5b5b5b',
                          strokeWidth: '0.3px',
                        }
                  }
                />
              );
            })}
          </svg>
        )}

        <PopoverStyled open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
          <div>
            {countryEvents.length > 0 ? (
              <ul>
                {countryEvents.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={{
                        pathname: '/events',
                        query: { country: event.country, industry: event.industry },
                      }}
                      passHref
                    >
                      <a>{event.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </PopoverStyled>
      </Container>
    </SectionLocation>
  );
};

export default LocationBlock;
