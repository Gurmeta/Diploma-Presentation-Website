export interface SlideMeta {
  id: number;
  /** Slide content component key, see `slides/index.tsx`. */
  key: 'title' | 'goal' | 'tasks' | 'contribution' | 'demo' | 'conclusion' | 'thanks' | 'extra';
}
