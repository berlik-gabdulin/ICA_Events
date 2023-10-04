import styled from '@emotion/styled';
import { Section } from 'src/components/globalStyles';
import customTheme from 'src/theme/customTheme';

export const SectionLocation = styled(Section)`
  background-color: ${customTheme.main[20]};
  svg {
    height: auto;
  }
`;
