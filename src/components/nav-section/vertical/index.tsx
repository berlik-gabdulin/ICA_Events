// @mui
import { List } from '@mui/material';
//
import { NavSectionProps } from '../type';
import { ListSubheaderStyle, VerticalBox } from './style';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavSectionVertical({ navConfig, isCollapse, ...other }: NavSectionProps) {
  return (
    <VerticalBox {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            disableGutters
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChildren={!!list.children}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}
    </VerticalBox>
  );
}
