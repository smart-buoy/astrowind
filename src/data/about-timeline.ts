/**
 * Type for a timeline event loaded from the aboutTimeline content collection.
 * Each event is defined in its own .md file under src/data/about-timeline/
 * with frontmatter: order, type?, year?, yearRange?, description: { en, de }.
 */
export interface TimelineEvent {
  type?: 'start' | 'end' | 'milestone';
  year?: string;
  yearRange?: string;
  description: {
    en: string;
    de: string;
  };
}
