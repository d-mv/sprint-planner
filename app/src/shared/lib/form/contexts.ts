import { createContext } from 'use-context-selector';

import { RecordObject, AnyValue } from '../../../models';
import { FormScenario, FormItem, SectionFormItem } from './models';

export interface FormContextType {
  scenario: FormScenario;
  actions?: RecordObject<(...args: AnyValue[]) => void>;
  submit: (form: FormData) => void;
  process?: RecordObject<boolean>;
  onError?: (message: string) => void;
  onMessage?: (message: string) => void;
}

export const FormContext = createContext<FormContextType>({} as FormContextType);

FormContext.displayName = 'FormContext';

export interface FormItemContextType {
  item: FormItem | SectionFormItem;
  onChange: (value: AnyValue) => void;
  onValidation: (status: boolean) => void;
  isValidated: boolean;
}

export const FormItemContext = createContext<FormItemContextType>({} as FormItemContextType);

FormItemContext.displayName = 'FormItemContext';
