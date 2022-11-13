import validator from 'validator';

import { FormItem, SectionFormItem } from '../models';

export function validateNumber(item: FormItem | SectionFormItem, value: string): boolean {
  if (!('validation' in item) || item.validation?.type !== 'number') return true;

  // TODO: implement min/max
  const { float, notNegative, noZero } = item.validation;

  let result = true;

  const isDecimal = validator.isDecimal(value, { force_decimal: true });

  if (float !== isDecimal) result = false;

  const number = isDecimal ? parseFloat(value) : parseInt(value);

  if (notNegative && number < 0) result = false;

  if (noZero && number === 0) result = false;

  return result;
}
