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
  { label: 'Download', href: '/download' },
  { label: 'Help', href: '/troubleshooting' },
  { 
    label: 'Resources', 
    href: '#', 
    children: [
      { label: 'Prompts', href: '/prompts', isNew: true },
      { label: 'Workflows', href: '/workflows' },
      { label: 'Agent Skills', href: '/skills' },
      { label: 'MCPs', href: '/mcp-servers' },
    ]
  },
  {
    label: 'Community',
    href: '#',
    children: [
      { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
      { label: 'Rules', href: '/rules' },
      { label: 'Blog', href: '#', disabled: true, title: 'Coming Soon' },
    ]
  },
  { label: 'Advertise', href: '/advertise' },
];
