import { ReactElement } from 'react';
import { TSolution } from 'src/utils/types';
import {
  ContentBlock,
  ImageBlock,
  TextBlock,
  Text,
  ThemeSection,
} from '../../pageStyles/stylesSolutions';
import { Container } from 'src/components/globalStyles';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';
import Image from 'next/image';

export const SolutionItem = ({ item, index }: { item: TSolution; index: number }): ReactElement => {
  const titleRef = useScrollAnimation('animate__fadeInUp', 300, 500);
  const imRef = useScrollAnimation(
    `animate__fadeIn${(index + 2) % 2 === 0 ? 'Left' : 'Right'}`,
    200,
    300
  );
  const textRef = useScrollAnimation(
    `animate__fadeIn${(index + 2) % 2 !== 0 ? 'Left' : 'Right'}`,
    200,
    300
  );

  return (
    <ThemeSection key={item.id}>
      <Container>
        <ContentBlock>
          <TextBlock>
            <h2 ref={titleRef}>{item.title}</h2>
            <Text dangerouslySetInnerHTML={{ __html: item.text }} ref={textRef} />
          </TextBlock>
          <ImageBlock ref={imRef}>
            <Image src={item.image} alt={item.title} width={529} height={432} />
          </ImageBlock>
        </ContentBlock>
      </Container>
    </ThemeSection>
  );
};
