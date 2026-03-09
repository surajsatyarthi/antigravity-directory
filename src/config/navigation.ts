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
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Troubleshooting', href: '/troubleshooting' },

      { label: 'Advertise', href: '/advertise' },
    ]
  },
];
