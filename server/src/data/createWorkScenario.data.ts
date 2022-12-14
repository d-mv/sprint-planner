import { FormScenario, FormTypes, FormItemValueTypes } from '../models';

export const createWorkScenario: FormScenario = {
  id: 'createWork',
  _form: {
    style: {
      width: '100%',
      // margin: '0 auto',
    },
  },
  items: {
    group1: {
      style: { display: 'flex', justifyContent: 'space-around' },
      order: 1,
      items: {
        jiraTicket: {
          dataId: 'jiraTicket',
          label: 'JIRA Ticket',
          type: FormTypes.TEXT,
          autoFocus: true,
          isRequired: true,
          placeholder: 'ECP-000',
          validation: {
            type: 'text',
            regex: '^ecp-\\d*$',
          },
        },
        jiraEpic: {
          dataId: 'jiraEpic',
          label: 'JIRA Epic',
          type: FormTypes.TEXT,
          validation: {
            type: 'text',
            regex: '^ecp-\\d*$',
          },
        },
      },
    },
    title: {
      order: 2,
      label: 'Title',
      dataId: 'title',
      type: FormTypes.TEXT,
      isRequired: true,
      style: { width: '100%' },
      validation: { type: 'text', nonEmpty: true },
    },
    group2: {
      style: { display: 'flex', justifyContent: 'space-around' },
      order: 3,
      items: {
        estimate: {
          dataId: 'estimate',
          label: 'Estimate',
          type: FormTypes.NUMBER,
          isRequired: true,
          validation: { type: 'number', float: false, noZero: true, notNegative: true },
        },
        startDate: {
          dataId: 'startDate',
          label: 'Start Date',
          type: FormTypes.DATE,
          isRequired: true,
          defaultValue: { type: FormItemValueTypes.DATE, value: 'current' },
        },
      },
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', id: 'submit', role: 'submit', style: { minWidth: '9rem' } },
    { label: 'Cancel', variant: 'text', type: 'primary', id: 'cancel' },
  ],
};
