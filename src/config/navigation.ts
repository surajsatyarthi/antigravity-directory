export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
  external?: boolean;
  disabled?: boolean;
  title?: string; // Tooltip/Title attribute
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Download', href: '/download' },
  { label: 'Help', href: '/troubleshooting' },
  { label: 'Blog', href: '#', disabled: true, title: 'Coming Soon' },
  { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
  { label: 'Prompts', href: '/prompts', isNew: true },
  { label: 'Rules', href: '/rules' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Agent Skills', href: '/skills' },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Advertise', href: '/advertise' },
];
