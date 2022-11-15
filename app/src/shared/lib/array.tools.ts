export function buildArray(length: number): number[] {
  const result: number[] = [];

  let i = 0;

  while (i < length) {
    result.push(i);
    i++;
  }
  return result;
}

export function mapWithIndex<T, K>(fn: (arg0: T, arg1: number, arg2: T[]) => K, data: T[]): K[] {
  const result: K[] = [];

  let i = 0;

  for (const el of data) {
    result.push(fn(el, i, data));
    i += 1;
  }

  return result;
}
