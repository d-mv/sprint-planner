import isDecimal from 'validator/es/lib/isDecimal';

import { FormItem, SectionFormItem } from '../models';

export function validateNumber(item: FormItem | SectionFormItem, value: string): boolean {
  if (!('validation' in item) || item.validation?.type !== 'number') return true;

  // TODO: implement min/max
  const { float, notNegative, noZero } = item.validation;

  const ifDecimal = isDecimal(String(value), { force_decimal: true });

  if (float !== ifDecimal) return false;

  const number = ifDecimal ? parseFloat(String(value)) : parseInt(String(value));

  if (notNegative && number < 0) return false;

  if (noZero && number === 0) return false;

  return true;
}
