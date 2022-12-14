import { FormScenario, FormTypes } from '../models';

export const createEngineerScenario: FormScenario = {
  id: 'createEngineer',
  _form: {
    style: {
      width: '35rem',
      paddingBlockStart: '1rem',
      paddingInline: '2rem',
    },
    label: 'Create Engineer',
  },
  items: {
    fName: {
      order: 1,
      dataId: 'firstName',
      label: 'First Name',
      autoFocus: true,
      autoCapitalize: 'sentences',
      type: FormTypes.TEXT,
      isRequired: true,
      placeholder: 'John',
    },
    lName: {
      order: 2,
      dataId: 'lastName',
      label: 'Last Name',
      autoCapitalize: 'sentences',
      type: FormTypes.TEXT,
      isRequired: true,
      placeholder: 'Smith',
    },
    daysOff: {
      order: 3,
      dataId: 'daysOff',
      label: 'Days Off',
      type: FormTypes.DATE_SET,
      defaultValue: 'current',
      buttons: [{ id: 'primary', label: 'Add Day Off' }],
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit' },
    { label: 'Cancel', variant: 'text', type: 'secondary', id: 'cancel' },
  ],
};
