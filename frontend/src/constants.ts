import type { SpiceLevel } from '@/types'

export const SPICE_LABELS: Record<SpiceLevel, string> = {
  mild: 'Mild',
  medium: 'Medium',
  hot: 'Hot',
  'extra-hot': 'Extra hot',
}

export const SPICE_LEVELS: SpiceLevel[] = ['mild', 'medium', 'hot', 'extra-hot']

export const MAX_PORTIONS = 5

