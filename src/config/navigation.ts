export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
  external?: boolean;
  disabled?: boolean;
  title?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Rules', href: '/rules' },
  { label: 'Prompts', href: '/prompts', isNew: true },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Skills', href: '/skills' },
  { label: 'Members', href: '/members' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Download', href: '/download' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
    ]
  },
];
