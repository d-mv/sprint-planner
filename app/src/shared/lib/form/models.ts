import { CSSProperties } from 'react';
import { RecordObject } from '../../../models';

export enum FormTypes {
  PERIOD = 'period',
  DATE = 'date',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'input',
  TEXTAREA = 'textarea',
  DROPZONE = 'dropzone',
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

export interface FormItem {
  order: number;
  className?: string;
  dataId: string;
  type: FormTypes;
  style?: CSSProperties;
  defaultValue?: string;
  label?: string;
  hint?: string;
  placeholder?: string;
  isRequired?: boolean;
  autoFocus?: boolean;
  autoComplete?: 'off';
  noValidation?: boolean;
  autoCapitalize?: 'off' | 'sentences' | 'words' | 'characters';
  minLength?: number;
  maxLength?: number;
  rows?: number;
  maxRows?: number;
  validation?: VersionValidation | TextValidation | DropValidation | NumberValidation;
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
}

export type SectionFormItem = Omit<FormItem, 'order'>;

export interface FormSection {
  style?: CSSProperties;
  order: number;
  items: RecordObject<SectionFormItem>;
}

export interface FormItems {
  [key: string]: FormSection;
}

export interface FormScenario {
  _form?: Partial<FormOptions>;
  items: { [key: string]: FormItem | FormSection };
  buttons: FormButton[];
  asserts?: { [key: string]: (value: string) => string };
}

// const r: FormScenario = {
//   items: {
//     jiraTicket: { order: 1, type: FormTypes.DATE },
//     _section1: {
//       style: { height: '30rem' },
//       order: 1,
//       items: {
//         jiraTicket: {
//           order: 1,
//           type: FormTypes.DATE,
//         },
//       },
//     },
//   },
//   buttons: [],
// };
