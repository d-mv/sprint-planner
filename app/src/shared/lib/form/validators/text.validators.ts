import { FormItem, SectionFormItem } from '../models';

export function validateText(item: FormItem | SectionFormItem, value: string): boolean {
  if (!('validation' in item) || item.validation?.type !== 'text') return true;

  // TODO: implement others
  const { regex, nonEmpty } = item.validation;

  if (nonEmpty && !value.length) return false;

  let result = true;

  if (regex) {
    const r = new RegExp(regex);

    result = r.test(value.toLowerCase());
  }

  return result;
}
