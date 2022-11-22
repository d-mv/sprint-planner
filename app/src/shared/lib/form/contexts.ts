import { AnyValue, RecordObject } from '@mv-d/toolbelt';
import { createContext } from 'use-context-selector';

import { FormScenario, FormItem, SectionFormItem } from './models';

export interface FormContextType {
  scenario: FormScenario;
  actions?: RecordObject<(...args: AnyValue[]) => void>;
  submitForm?: (form: FormData) => void;
  submitData?: (form: RecordObject<AnyValue>) => void;
  process?: RecordObject<boolean>;
  onError?: (message: string) => void;
  onMessage?: (message: string) => void;
  dataSources?: RecordObject<() => unknown[]>;
  renders?: RecordObject<(item: AnyValue) => JSX.Element>;
  initial?: RecordObject<AnyValue>;
  components?: RecordObject<() => JSX.Element>;
  triggers?: RecordObject<(arg0: string) => void>;
  disabled?: string[];
}

export const FormContext = createContext<FormContextType>({} as FormContextType);

FormContext.displayName = 'FormContext';

export interface FormItemContextType {
  item: FormItem | SectionFormItem;
  onChange: (value: AnyValue) => void;
  onValidation: (status: boolean) => void;
  isValidated: boolean;
  value: string | string[];
}

export const FormItemContext = createContext<FormItemContextType>({} as FormItemContextType);

FormItemContext.displayName = 'FormItemContext';

export interface FormInternalContextType {
  statuses: RecordObject<boolean>;
}

export const FormInternalContext = createContext<FormInternalContextType>({} as FormInternalContextType);

FormInternalContext.displayName = 'FormInternalContext';
