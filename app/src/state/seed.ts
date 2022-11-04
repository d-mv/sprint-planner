import dayjs from 'dayjs';
// import { buildSprintDays } from '../entities/days/days.tools';

export const engineers = [
  {
    id: 'xxxx',
    person: { firstName: 'Dmitry', lastName: 'Melnikov' },
    daysOff: [dayjs(new Date('11/03/2022'))],
  },
  {
    id: 'xxxx2',
    person: { firstName: 'Dmitry1', lastName: 'Melnikov2' },
    daysOff: [dayjs(new Date('11/08/2022'))],
  },
  {
    id: 'xxxx3',
    person: { firstName: 'Dmitry3', lastName: 'Melnikov3' },
    daysOff: [dayjs(new Date('11/10/2022'))],
  },
];

// const start = dayjs();

// const sprintTemp = {
//   id: 'yc7JCsRMiFtUEfJpml9v4',
//   name: 'Nov 1',
//   startDate: start,
//   endDate: start.add(14, 'days'),
//   days: [],
// };
// const days = buildSprintDays(sprintTemp);

// export const sprint = { ...sprintTemp, days };

export const works = [
  {
    estimate: 4,
    id: 'AJLK1TsE9FC3DrPtRFNZk',
    jiraTicket: 'ECP-Some',
    title: 'Occaecat nulla ut elit excepteur sunt nisi pariatur. Duis laboris cillum ullamco occaecat culpa deserunt.',
  },
  {
    estimate: 4,
    id: 'AJLK1TsE9FC3DrPtFNZk',
    jiraTicket: 'ECP-Some',
    title: 'Occaecat nulla ut elit excepteur sunt nisi pariatur. Duis laboris cillum ullamco occaecat culpa deserunt.',
  },
  {
    estimate: 4,
    id: 'AJLK1TsE9FC3DrtRFNZk',
    jiraTicket: 'ECP-Some',
    title: 'Occaecat nulla ut elit excepteur sunt nisi pariatur. Duis laboris cillum ullamco occaecat culpa deserunt.',
  },
  {
    estimate: 4,
    id: 'AJLK1TsE9FC3rPtRFNZk',
    jiraTicket: 'ECP-Some',
    title: 'Occaecat nulla ut elit excepteur sunt nisi pariatur. Duis laboris cillum ullamco occaecat culpa deserunt.',
  },
  {
    estimate: 4,
    id: 'AJLK1TsE9C3DrPtRFNZk',
    jiraTicket: 'ECP-Some',
    title: 'Occaecat nulla ut elit excepteur sunt nisi pariatur. Duis laboris cillum ullamco occaecat culpa deserunt.',
  },
];

export const assignedWork = {
  end: dayjs().add(4, 'days'),
  engineerId: 'xxxx',
  id: 'W-1hQED0u3Px5an-QeaTv',
  start: dayjs(),
  workId: 'AJLK1TsE9FC3DrPtRFNZk',
};

export const dayOff = dayjs('11/07/2022');
