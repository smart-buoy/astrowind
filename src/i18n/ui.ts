import yaml from 'js-yaml';
import enYaml from './locales/en.yml?raw';
import deYaml from './locales/de.yml?raw';

export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const defaultLang = 'en';
export const showDefaultLang = false;

type LangCode = keyof typeof languages;

const localeRaw: Record<LangCode, string> = {
  en: enYaml,
  de: deYaml,
};

/** Flatten nested { a: { b: "value" } } to { "a.b": "value" } for lookup. */
function flattenKeys(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      out[key] = v;
    } else if (
      v !== null &&
      typeof v === 'object' &&
      !Array.isArray(v)
    ) {
      Object.assign(out, flattenKeys(v as Record<string, unknown>, key));
    }
  }
  return out;
}

function parseLocale(raw: string): Record<string, string> {
  const parsed = yaml.load(raw);
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    return flattenKeys(parsed as Record<string, unknown>);
  }
  return {};
}

export const ui: Record<LangCode, Record<string, string>> = Object.fromEntries(
  (Object.entries(localeRaw) as [LangCode, string][]).map(([lang, raw]) => [
    lang,
    parseLocale(raw),
  ])
) as Record<LangCode, Record<string, string>>;

/**
 * Keys missing in each locale compared to the default language.
 * Useful for spotting untranslated strings and feeding translation tools.
 */
export function getMissingTranslations(): Record<LangCode, string[]> {
  const baseKeys = new Set(Object.keys(ui[defaultLang]));
  const report = {} as Record<LangCode, string[]>;
  for (const lang of Object.keys(ui) as LangCode[]) {
    if (lang === defaultLang) {
      report[lang] = [];
      continue;
    }
    const localeKeys = new Set(Object.keys(ui[lang]));
    report[lang] = [...baseKeys].filter((k) => !localeKeys.has(k));
  }
  return report;
}

export const routes = {
  en: {
    'the-buoy': 'the-buoy',
    skipper: 'skipper',
    operator: 'operator',
    about: 'about',
    team: 'team',
    contact: 'contact',
    blog: 'blog',
    'legal-notice': 'legal-notice',
    privacy: 'privacy',
  },
  de: {
    'the-buoy': 'die-boje',
    skipper: 'skipper',
    operator: 'betreiber',
    about: 'ueber-uns',
    team: 'team',
    contact: 'kontakt',
    blog: 'blog',
    'legal-notice': 'impressum',
    privacy: 'datenschutz',
  },
} as const;
