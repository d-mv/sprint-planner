import { FormScenario, FormTypes } from '../models';

export const engineerDaysOffScenario: FormScenario = {
  id: 'engineerDaysOff',
  _form: {
    style: { width: '95%', margin: '0 auto' },
  },
  items: {
    daysOff: {
      order: 1,
      dataId: 'daysOff',
      label: 'Days Off',
      type: FormTypes.DATE_SET,
      defaultValue: 'current',
      buttons: [{ id: 'primary', label: 'Add Day Off' }],
      individualStyles: {
        input: {
          maxWidth: '20rem',
          margin: '0 auto',
        },
        error: {
          textAlign: 'center',
          marginInlineStart: 'calc(50% - 8rem)',
          width: 'fit-content',
        },
      },
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit' },
    { label: 'Cancel', variant: 'text', type: 'secondary', id: 'cancel' },
  ],
};
