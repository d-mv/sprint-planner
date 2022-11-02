export function buildArray(length: number): number[] {
  const result: number[] = [];

  let i = 0;

  while (i < length) {
    result.push(i);
    i++;
  }
  return result;
}
