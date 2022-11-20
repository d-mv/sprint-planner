import { FormScenario, FormTypes } from '../models';

export const createSprintScenario: FormScenario = {
  _form: {
    style: {
      width: 'fit-content',
      paddingBlockStart: '1rem',
      paddingInline: '2rem',
    },
    label: 'Create Sprint',
  },
  items: {
    name: {
      order: 1,
      dataId: 'name',
      label: 'Sprint Name',
      type: FormTypes.TEXT,
      isRequired: true,
      placeholder: 'Sprint __current_month__ 1',
    },
    _group1: {
      order: 2,
      style: { display: 'flex' },
      label: 'Period',
      items: {
        startDate: {
          dataId: 'startDate',
          label: 'Start Date',
          type: FormTypes.DATE,
          isRequired: true,
          defaultValue: 'current',
        },
        _spacer1: {
          dataId: '',
          type: FormTypes.V_SPACER,
          style: { width: '2rem' },
        },
        endDate: {
          dataId: 'endDate',
          label: 'End Date',
          type: FormTypes.DATE,
          isRequired: true,
          defaultValue: '+14',
        },
      },
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
