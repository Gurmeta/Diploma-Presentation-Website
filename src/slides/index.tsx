import type { ComponentType } from 'react';
import type { SlideMeta } from '../types';
import TitleSlide from './TitleSlide';
import GoalSlide from './GoalSlide';
import TasksSlide from './TasksSlide';
import ContributionSlide from './ContributionSlide';
import DemoSlide from './DemoSlide';
import ConclusionSlide from './ConclusionSlide';
import ThanksSlide from './ThanksSlide';
import ExtraSlide from './ExtraSlide';

/** Presentation order. Titles and descriptions live in the i18n dictionaries. */
export const SLIDE_KEYS: SlideMeta['key'][] = [
  'title',
  'goal',
  'tasks',
  'contribution',
  'demo',
  'conclusion',
  'thanks',
  'extra',
];

const COMPONENTS: Record<SlideMeta['key'], ComponentType> = {
  title: TitleSlide,
  goal: GoalSlide,
  tasks: TasksSlide,
  contribution: ContributionSlide,
  demo: DemoSlide,
  conclusion: ConclusionSlide,
  thanks: ThanksSlide,
  extra: ExtraSlide,
};

export function SlideContent({ slideId }: { slideId: number }) {
  const Slide = COMPONENTS[SLIDE_KEYS[slideId - 1]];
  return <Slide />;
}
