import { FormScenario, FormTypes } from '../models';

export const assignEngineerScenario: FormScenario = {
  id: 'assignEngineer',
  _form: {
    style: {
      width: '40rem',
      paddingBlockStart: '1rem',
      paddingInline: '2rem',
    },
  },
  items: {
    engineerId: {
      order: 1,
      dataId: 'engineerId',
      label: 'Engineer',
      type: FormTypes.SELECTOR,
      autoFocus: true,
      isRequired: true,
      noValidation: true,
      style: { display: 'flex', width: '100%', justifyContent: 'space-between' },
      individualStyles: { label: { width: '10rem' } },
      missingDataMessage: 'No engineers to assign',
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit', style: { minWidth: '9rem' } },
    { label: 'Cancel', variant: 'text', type: 'primary', id: 'cancel' },
  ],
};
