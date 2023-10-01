import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const links = [
  {
    name: 'Finder',
    key: 'finder',
    to: '/finder',
    icon: <SearchIcon />,
  },
  {
    name: 'Saved',
    key: 'saved',
    to: '/saved-recipes',
    icon: <BookmarksIcon />,
  },
  // {
  //     name: "Debug Auth",
  //     key: "debug-auth",
  //     to: "/debug-auth",
  //     icon: <LockIcon />
  // }
  // {
  //     name: "Settings",
  //     key: "settings",
  //     to: "/settings",
  //     icon: <SettingsIcon />
  // },
  {
    name: 'Links',
    key: 'links',
    to: '/links',
    icon: <LinkIcon />,
  },
  {
    name: 'FAQ',
    key: 'faq',
    to: '/faq',
    icon: <QuestionAnswerIcon />,
  },
];

export default function SideNav() {
  const location = useLocation();

  return (
    <div>
      <Toolbar />
      <List>
        {links.map((l) => {
          const navLinkClassName =
            location.pathname === l.to
              ? 'sidebar-nav-item sidebar-nav-item--active'
              : 'sidebar-nav-item';
          return (
            <NavLink
              end={l.to === '/' ? true : false}
              className={navLinkClassName}
              to={l.to}
              key={l.key}
            >
              <ListItemButton selected={location.pathname === l.to}>
                <ListItemIcon>{l.icon}</ListItemIcon>
                <ListItemText primary={l.name} />
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </div>
  );
}
