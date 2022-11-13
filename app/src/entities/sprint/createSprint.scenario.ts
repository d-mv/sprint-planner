import { FormScenario } from '../../shared';

export const loginFormScenario: FormScenario = {
  _form: {
    style: {
      width: '25rem',
    },
  },
  items: {
    // email: { autoFocus: true, order: 1, type: FormTypes.EMAIL, label: 'Email', hint: 'Enter email' },
    // password: { order: 2, type: FormTypes.PASSWORD, minLength: 8 },
  },
  buttons: [
    { label: 'Submit', type: 'primary', actionId: 'submit', role: 'submit' },
    { label: 'Cancel', variant: 'text', type: 'secondary', actionId: 'cancel' },
  ],
};
