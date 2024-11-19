import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'skipper',
      href: getPermalink('/')
    },
    {
      text: 'operator',
      href: getPermalink('/operator')
    },
    {
      text: 'company',
      links: [
        {text: 'about', href: getPermalink('/about')},
        {text: 'team', href: getPermalink('/team')},
      ]
    }
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'product',
      links: [
        { text: 'skipper', href: getPermalink('/') },
        { text: 'operator', href: getPermalink('/operator') }
      ],
    },
    {
      title: 'company',
      links: [
        { text: 'about', href: getPermalink('/about') },
        { text: 'team', href: getPermalink('/team') },
        { text: 'sdg', href: getPermalink('/sdg') },
      ],
    },
    {
      title: 'support',
      links: [
        { text: 'contact', href: getPermalink('/contact') }
      ],
    },
  ],
  secondaryLinks: [
    { text: 'imprint', href: getPermalink('/imprint') },
    { text: 'privacy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/smartbuoy-gmbh/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/profile.php?id=61553150710926' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ]
};
