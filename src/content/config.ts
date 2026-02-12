import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const localizedString = () =>
  z.object({
    en: z.string().optional(),
    de: z.string().optional(),
  });

const postCollection = defineCollection({
  loader: glob({
    pattern: ['en/*.md', 'en/*.mdx', 'de/*.md', 'de/*.mdx'],
    base: 'src/data/post',
  }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    /** Language code (e.g. en, de). If omitted, derived from file path (en/ or de/). */
    lang: z.string().optional(),

    /** Shared ID across translated posts; used by the language switcher to find the same post in another language. */
    translationId: z.string().optional(),

    /** Optional in-article banner (heading, CTA text, CTA URL). Insert <PostBanner /> in MDX and pass frontmatter.banner. */
    banner: z
      .object({
        heading: z.string(),
        ctaText: z.string(),
        ctaUrl: z.string(),
      })
      .optional(),

    /** Optional blog-specific FAQ; one entry per language file. Rendered below post content. */
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    metadata: metadataDefinition(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: 'src/data/team',
  }),
  schema: z.object({
    name: z.string(),
    image: z.string().optional(),
    order: z.number().optional(),
    position: localizedString().optional(),
    description: localizedString().optional(),
    socialFacebook: z.string().url().optional(),
    socialX: z.string().url().optional(),
    socialLinkedIn: z.string().url().optional(),
    socialInstagram: z.string().url().optional(),
  }),
});

const faqCollection = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: 'src/data/faq',
  }),
  schema: z.object({
    area: z.enum(['buoy', 'skipper', 'operator']),
    order: z.number().optional(),
    question: localizedString(),
    answer: localizedString(),
  }),
});

const aboutTimelineCollection = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: 'src/data/about-timeline',
  }),
  schema: z.object({
    order: z.number(),
    type: z.enum(['start', 'end', 'milestone']).optional(),
    year: z.string().optional(),
    yearRange: z.string().optional(),
    description: z.object({
      en: z.string(),
      de: z.string(),
    }),
  }),
});

export const collections = {
  post: postCollection,
  team: teamCollection,
  faq: faqCollection,
  aboutTimeline: aboutTimelineCollection,
};
