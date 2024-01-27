import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { Section } from 'src/components/globalStyles';
import customTheme from 'src/theme/customTheme';

export const SectionLocation = styled(Section)`
  background-color: ${customTheme.main[20]};
  svg {
    height: auto;
  }
`;

export const PopoverStyled = styled(Popover)`
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
