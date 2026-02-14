/**
 * Content for the About page. Each locale has its own page (about.astro / de/ueber-uns.astro)
 * that defines this content and passes it to AboutPage.
 */
export interface AboutPageContent {
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
  };
  intro: {
    paragraph1: string;
    subheadline: string;
  };
  story: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    bullets: string[];
    conclusion: string;
  };
  timeline: {
    title: string;
    subtitle: string;
  };
}
