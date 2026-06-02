// src/app/story/page.tsx
import { StoryModeScene } from '../../features/StoryModeScene/StoryModeScene';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Story | Parham Portfolio",
  description: "Interactive scrollytelling story mode of Parham's portfolio.",
};

export default function StoryPage() {
  return <StoryModeScene />;
}
