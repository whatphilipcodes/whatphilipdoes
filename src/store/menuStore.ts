// src/store/menuStore.ts (adjust path to your preference)

import type { ActionAnchorProps } from '@react/ActionAnchor'; // Adjust path
import { atom } from 'nanostores';

export const currentActionStore = atom<ActionAnchorProps | null>(null);
