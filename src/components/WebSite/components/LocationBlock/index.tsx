import React, { MouseEvent, useState } from 'react';
import Map from 'src/utils/mapData';
import { eurasia, countries } from 'src/utils/network';
import { Popover, Tooltip } from '@mui/material';
import customTheme from 'src/theme/customTheme';
import { SectionLocation } from './styles';
import { TEvent } from 'src/utils/types';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Container, Title } from 'src/components/globalStyles';

const LocationBlock = ({ events }: { events: TEvent[] }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  return (
    <SectionLocation>
      <Container>
        <Title style={{ color: customTheme.main[100] }}>Choose your event destination</Title>
        <svg viewBox={Map.viewBox} className="svg-map">
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

const PopoverStyled = styled(Popover)`
  .MuiPaper-root {
    padding: 20px;
    a {
      color: ${customTheme.main[100]};
      text-decoration: none;
      &:hover {
        color: ${customTheme.light[100]};
      }
    }
    ul {
      max-height: 300px;
      overflow-y: scroll;
      li {
        list-style-type: none;
      }
    }
  }
`;
