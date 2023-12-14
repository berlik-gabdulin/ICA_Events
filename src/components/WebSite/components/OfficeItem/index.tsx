import { ReactElement, useState } from 'react';
import { TOffice } from 'src/utils/types';
import {
  ImageBlock,
  LookMap,
  Text,
  TextBlock,
  ThemeSection,
  MapButton,
} from 'src/components/WebSite/pageStyles/stylesContacts';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';
import customTheme from 'src/theme/customTheme';

export const OfficeItem = ({ item, index }: { item: TOffice; index: number }): ReactElement => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showMap, setShowMap] = useState<string | null>(null);

  const toggleMap = (id: string) => {
    setShowMap(showMap === id ? null : id);
  };

  const extractIframeSrc = (iframeHtml: string) => {
    const doc = new DOMParser().parseFromString(iframeHtml, 'text/html');
    const iframe = doc.querySelector('iframe');
    return iframe ? iframe.getAttribute('src') : null;
  };

  const titleRef = useScrollAnimation('animate__fadeInUp', 300, 300);
  const imgRef = useScrollAnimation('animate__fadeInUp', 200, 400);
  const textRef = useScrollAnimation('animate__fadeInUp', 200, 500);
  const btnRef = useScrollAnimation('animate__fadeInUp', 200, 600);
  const hoursRef = useScrollAnimation('animate__fadeInUp', 200, 700);
  const hoursTitleRef = useScrollAnimation('animate__fadeInUp', 200, 800);

  return (
    <ThemeSection key={item.id}>
      <TextBlock className="text_block">
        <div className="text_inner_block">
          <h2 ref={titleRef}>{item.city}</h2>
          <Text dangerouslySetInnerHTML={{ __html: item.text }} ref={textRef} />
          <div ref={btnRef}>
            <LookMap variant="text" onClick={() => toggleMap(item.id)}>
              <FontAwesomeIcon icon={faLocationDot} />
              Look at the map
            </LookMap>
          </div>
          <h3 ref={hoursRef}>Hours</h3>
          <Text dangerouslySetInnerHTML={{ __html: item.hours }} ref={hoursTitleRef} />
        </div>
      </TextBlock>
      <ImageBlock
        className="image_block"
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
        ref={imgRef}
      >
        <div
          className="image_inner_block"
          style={{ maxWidth: showMap === item.id ? '100%' : '625px' }}
        >
          {showMap === item.id ? (
            <iframe
              src={extractIframeSrc(item.map) as string}
              title={item.city}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <>
              <Image src={item.image} alt={item.city} layout="fill" />
              {hovered === item.id && (
                <MapButton
                  onClick={() => toggleMap(item.id)}
                  variant="contained"
                  customcolor={customTheme.light[100]}
                >
                  Map
                </MapButton>
              )}
            </>
          )}
        </div>
      </ImageBlock>
    </ThemeSection>
  );
};
