import type { ActionAnchorProps } from '@react/ActionAnchor';
import { atom, map } from 'nanostores';

export const $currentActionStore = map<Partial<ActionAnchorProps>>({});
export const $locale = atom<'en-GB' | 'de-DE'>('en-GB');
export const $theme = atom<'dark' | 'light'>('dark');
