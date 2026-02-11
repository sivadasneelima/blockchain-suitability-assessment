export const sections = [
  'entry',
  'data',
  'stakeholder',
  'cost',
] as const;

export type Section = typeof sections[number];
