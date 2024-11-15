import { ui, defaultLang, showDefaultLang, routes  } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: (keyof typeof ui[typeof defaultLang]) | string | undefined) {
    if(key === undefined) return '';
    return ui[lang][key] || ui[defaultLang][key] || key;
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string | undefined, l: string = lang) {
    if(path === undefined) return '/'
    
    const pathName = path.replaceAll('/', '')
    const hasTranslation = defaultLang !== l && routes[l] !== undefined && routes[l][pathName] !== undefined
    const translatedPath = hasTranslation ? '/' + routes[l][pathName] : path

    return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`.replace(/\/+$/, "")
  }
}

export function getRouteWithoutLang(url: URL, currentLanguage: keyof typeof ui) {
  const pathname = getRouteFromUrl(url) ?? '/';

  if(pathname.startsWith(`/${currentLanguage}`)) {
    const replacedPathName = pathname.replace(`/${currentLanguage}`, '');
    return !replacedPathName ? '/' : replacedPathName;
  }

  if(pathname.startsWith(currentLanguage)) {
    const replacedPathName = pathname.replace(`${currentLanguage}`, '');
    return !replacedPathName ? '/' : replacedPathName;
  }
  return `/${pathname}`;
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLang === currentLang) {
    const route = Object.values(routes)[0];
    return route[path] !== undefined ? route[path] : path;
  }

  const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {
      return Object.keys(obj).find((key) => obj[key] === value);
  }

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return path;
}