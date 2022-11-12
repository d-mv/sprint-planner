import { FormScenario, FormTypes } from '../../shared';

export const createWorkFormScenario: FormScenario = {
  _form: {
    style: {
      width: '90%',
      margin: '0 auto',
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
        },
        jiraEpic: { dataId: 'jiraEpic', label: 'JIRA Epic', type: FormTypes.TEXT },
      },
    },
    title: {
      order: 2,
      label: 'Title',
      dataId: 'title',
      type: FormTypes.TEXT,
      isRequired: true,
      style: { width: '100%' },
    },
    group2: {
      style: { display: 'flex', justifyContent: 'space-around' },
      order: 3,
      items: {
        estimate: { dataId: 'estimate', label: 'Estimate', type: FormTypes.NUMBER, isRequired: true },
        startDate: { dataId: 'startDate', label: 'Start Date', type: FormTypes.DATE, isRequired: true },
      },
    },
  },
  buttons: [
    { label: 'Submit', type: 'primary', actionId: 'submit', role: 'submit' },
    { label: 'Cancel', type: 'secondary', actionId: 'cancel' },
  ],
};
