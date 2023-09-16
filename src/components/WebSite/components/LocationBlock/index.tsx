import React, { MouseEvent, useState } from 'react';
import Map from 'src/utils/mapData';
import { eurasia, ourNetwork } from 'src/utils/network';
import { Container, Title } from 'src/components/globalStyles';
import palette from 'src/theme/palette';
import { Popover, Tooltip } from '@mui/material';
import { SectionLocation } from './styles';

const LocationBlock = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onCountryClick = (event: MouseEvent<SVGPathElement>, prop: string) => {
    setSelectedCountry(prop);
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredLocations = Map.locations.filter((location) => eurasia.includes(location.name));

  return (
    <SectionLocation>
      <Container>
        <Title>Choose your event destination</Title>

        <svg viewBox={Map.viewBox} className="svg-map">
          {filteredLocations.map((location) => {
            const isOurNetwork = ourNetwork.includes(location.name);

            return (
              <Tooltip
                title={`${location.name} - ${isOurNetwork ? '5 events' : 'No events'}`}
                key={location.id}
              >
                <path
                  d={location.path}
                  className={`svg-map__location ${isOurNetwork ? 'svg-map__location-ica' : ''}`}
                  onClick={(e) => isOurNetwork && onCountryClick(e, location.name)}
                  style={
                    isOurNetwork
                      ? {
                          fill:
                            selectedCountry === location.name
                              ? palette.light.primary.light
                              : palette.light.primary.dark,
                          cursor: 'pointer',
                        }
                      : { fill: 'grey', cursor: 'default' }
                  }
                  name={location.name}
                />
              </Tooltip>
            );
          })}
        </svg>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
          <div>
            {/* Ваш контент здесь */}
            {selectedCountry && `Selected Country: ${selectedCountry}`}
          </div>
        </Popover>
      </Container>
    </SectionLocation>
  );
};

export default LocationBlock;
