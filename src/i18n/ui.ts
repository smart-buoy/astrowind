export const languages = {
  en: 'English',
  de: 'Deutsch'
};

export const defaultLang = 'en';
export const showDefaultLang = false;

export const ui = {
  en: {
    'nav.skipper': 'For Skippers',
    'nav.operator': 'For Owners',
    'nav.company': 'Company',
    'nav.about': 'About Us',
    'nav.team': 'Team',
    'nav.product': 'Product',
    'nav.support': 'Support',
    'nav.contact': 'Contact',
    'nav.imprint': 'Imprint',
    'nav.privacy': 'Privacy Policy',
    'nav.sdg': 'SDG',

    "team.title": "Our Team",
    "team.subtitle": "We are a team of passionate sailors, engineers, and entrepreneurs who are dedicated to making the maritime industry more sustainable.",
  },
  de: {
    'nav.skipper': 'Für Skipper',
    'nav.operator': 'Für Betreiber',
    'nav.company': 'Unternehmen',
    'nav.about': 'Über uns',
    'nav.team': 'Team',
    'nav.product': 'Produkt',
    'nav.support': 'Support',
    'nav.contact': 'Kontakt',
    'nav.imprint': 'Impressum',
    'nav.privacy': 'Datenschutzerklärung',
    'nav.sdg': 'SDG',

    "team.title": "Unser Team",
    "team.subtitle": "Wir sind ein Team aus leidenschaftlichen Seglern, Ingenieuren und Unternehmern, die sich der nachhaltigen Gestaltung der maritimen Industrie verschrieben haben.",
  }
} as const;


export const routes = {
  en: {
    "skipper": "skipper",
    "operator": "operator",
    "company": "company",
    "about": "about",
    "team": "team",
  },
  de: {
    "skipper": "skipper",
    "operator": "betreiber",
    "company": "unternehmen",
    "about": "ueber-uns",
    "team": "team",
  },
} as const;