import { CSSProperties } from 'react';
import { RecordObject } from '../../models';

export enum FormTypes {
  CUSTOM = 'custom',
  PERIOD = 'period',
  DATE = 'date',
  DATE_SET = 'date_set',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'input',
  TEXTAREA = 'textarea',
  DROPZONE = 'dropzone',
  SELECTOR = 'selector',
  V_DIVIDER = 'v_divider',
  H_DIVIDER = 'h_divider',
  V_SPACER = 'v_spacer',
  H_SPACER = 'h_spacer',
}

export type Version = `${number}${number | ''}.${number}${number | ''}.${number}${number | ''}`;

export type ExportFrom = `./${string}`;

export interface DropValidation {
  type: 'drop';
  minQty: number;
}

export interface VersionValidation {
  type: 'version';
  minVersion: Version;
}

export interface TextValidation {
  type: 'text';
  regex?: string;
  example?: string;
  noWhitespace?: boolean;
  trim?: boolean;
  nonEmpty?: boolean;
}

export interface NumberValidation {
  type: 'number';
  min?: number;
  max?: number;
  float?: boolean;
  notNegative?: boolean;
  noZero?: boolean;
}

export interface FormItemButton {
  id: 'primary' | 'secondary';
  label: string | string[];
}

export enum FormItemValueTypes {
  DATE = 'date',
  DATA_SET = 'dataSet',
}

export interface FormItemValue {
  type: FormItemValueTypes;
  value: string;
}

export interface FormItem {
  order: number;
  className?: string;
  dataId: string;
  type: FormTypes;
  style?: CSSProperties; // whole item style
  individualStyles?: RecordObject<CSSProperties>; // dictionary of individual styles
  defaultValue?: string | FormItemValue;
  label?: string;
  hint?: string;
  missingDataMessage?: string; // for item with provided data, message to show when empty
  placeholder?: string;
  isRequired?: boolean;
  autoFocus?: boolean;
  autoComplete?: 'off';
  noValidation?: boolean;
  autoCapitalize?: 'off' | 'sentences' | 'words' | 'characters';
  minLength?: number;
  maxLength?: number;
  rows?: number;
  dataSourceId?: string;
  maxRows?: number;
  validation?: VersionValidation | TextValidation | DropValidation | NumberValidation;
  triggers?: string[]; // ids of trigger function to send value to
  buttons?: FormItemButton[];
}

export interface FormButton {
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  type: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  id: string;
  role?: 'submit' | 'reset';
  style?: CSSProperties;
}

export interface FormOptions {
  style: CSSProperties;
  inputLineStyle: CSSProperties;
  label?: string;
}

export type SectionFormItem = Omit<FormItem, 'order'>;

export interface FormSection {
  style?: CSSProperties;
  order: number;
  label?: string;
  items: RecordObject<SectionFormItem>;
}

export interface FormItems {
  [key: string]: FormSection;
}

export interface FormScenario {
  id: string;
  _form?: Partial<FormOptions>;
  items: { [key: string]: FormItem | FormSection };
  buttons: FormButton[];
  asserts?: { [key: string]: (value: string) => string };
}
