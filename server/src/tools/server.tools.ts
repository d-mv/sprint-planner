import { RecordObject, R } from '@mv-d/toolbelt';

export function getter(headers: unknown) {
  if ('x-controller' in (headers as RecordObject)) return R.path(['x-controller'], headers);

  return 'n/a';
}
