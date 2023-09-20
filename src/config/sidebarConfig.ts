type SidebarConfigItem = {
  title: string;
  path: string;
  children?: SidebarConfigItem[];
};

const sidebarConfig: { subheader: string; items: SidebarConfigItem[] }[] = [
  {
    subheader: '',
    items: [
      {
        title: 'Pages',
        path: '/admin/pages',
        children: [
          { title: 'Home Page', path: '/admin/pages/home' },
          { title: 'About', path: '/admin/pages/about' },
          { title: 'Events', path: '/admin/pages/events' },
          { title: 'Event Solutions', path: '/admin/pages/solutions' },
          { title: 'Contacts', path: '/admin/pages/contacts' },
        ],
      },
      {
        title: 'Media',
        path: '/admin/media',
        children: [
          { title: 'Galleries', path: '/admin/media/galleries' },
          { title: 'News', path: '/admin/media/news' },
          { title: 'Marketing materials', path: '/admin/media/materials' },
        ],
      },
      {
        title: 'Users',
        path: '/admin/users',
      },
      {
        title: 'Settings',
        path: '/admin/settings',
      },
    ],
  },
];

export default sidebarConfig;
