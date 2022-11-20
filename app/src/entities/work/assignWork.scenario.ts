import { FormItemValueTypes, FormScenario, FormTypes } from '../../shared';

export const assignWorkFormScenario: FormScenario = {
  _form: {
    style: {
      width: '95%',
      margin: '0 auto',
      justifyContent: 'center',
    },
    inputLineStyle: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  items: {
    workId: {
      order: 1,
      dataId: 'workId',
      label: 'Work',
      type: FormTypes.SELECTOR,
      autoFocus: true,
      isRequired: true,
      noValidation: true,
      triggers: ['workId'],
    },
    group1: {
      order: 2,
      style: { display: 'flex', width: '100%', justifyContent: 'space-around' },
      items: {
        startDate: {
          dataId: 'startDate',
          label: 'Start Date',
          type: FormTypes.DATE,
          isRequired: true,
          defaultValue: { type: FormItemValueTypes.DATE, value: 'current' },
          triggers: ['date'],
        },
        _message: {
          dataId: 'message',
          type: FormTypes.CUSTOM,
        },
      },
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit', style: { minWidth: '9rem' } },
    { label: 'Cancel', variant: 'text', type: 'primary', id: 'cancel' },
  ],
};
