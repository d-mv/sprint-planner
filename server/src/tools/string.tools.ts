export function capitalize(s: string): string {
  if (!s || typeof s !== 'string') return '';

  return s.slice(0, 1).toUpperCase() + s.slice(1);
}
