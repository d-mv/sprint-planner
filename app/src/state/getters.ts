import { Dayjs } from 'dayjs';
import memoizeOne from 'memoize-one';
import { omit, sum } from 'ramda';

import { State } from '.';
import { WorkToRender } from '../entities';
import { Option } from '../models';

export const getSprints = (state: State) => state.sprints;

export const getItemsLength = memoizeOne(getSprints);

export const getDaysOff = (state: State) => state.daysOff;

export const getIsDayOff = (state: State) => (day?: Option<Dayjs>) =>
  day ? Boolean(state.daysOff.find((d) => d.isSame(day, 'date'))) : false;

export const getEngineers = (state: State) => state.engineers;

export const getEngineerById = (state: State) => (engineerId: string) =>
  state.engineers.find((engineer) => engineer.id === engineerId);

export const getDaysOffForEngineer = (state: State) => (engineerId: string) =>
  state.engineers.find((engineer) => engineer.id === engineerId)?.daysOff ?? [];

export const getIsEngineerAdded = (state: State) => (engineerId: string) =>
  Boolean(state.engineers.find((engineer) => engineer.id === engineerId));

const addedEngineers = (state: State) =>
  state.engineers.filter((engineer) =>
    state.addedEngineers.includes(engineer.id)
  );

const notAddedEngineers = (state: State) =>
  state.engineers.filter(
    (engineer) => !state.addedEngineers.includes(engineer.id)
  );

export const getAddedEngineers = memoizeOne(addedEngineers);
export const getNotAddedEngineers = memoizeOne(notAddedEngineers);

export function getWorksForEngineer(state: State) {
  return function call(engineerId: string): WorkToRender[] {
    const assignedWorks = state.assignedWorks.filter(
      (work) => work.engineerId === engineerId
    );
    return assignedWorks.map((assignedWork) => ({
      ...omit(['workId'], assignedWork),
      work: state.works.find((work) => work.id === assignedWork.workId)!,
    }));
  };
}

function unAssignedWorks(state: State) {
  const assignedIds = state.assignedWorks.map((el) => el.workId);
  return state.works.filter((work) => !assignedIds.includes(work.id));
}

export const getUnAssignedWorks = memoizeOne(unAssignedWorks);

const unAssignedWorksQty = (state: State) => unAssignedWorks(state).length;

export const getUnAssignedWorksQty = memoizeOne(unAssignedWorksQty);

const sprintDays = (state: State) =>
  state.sprints.map((sprint) => sprint.days).flat();

export const getSprintDays = memoizeOne(sprintDays);

export function findDayInDays(day: Dayjs, days: Dayjs[]): Option<Dayjs> {
  if (!days.length) return undefined;

  return days.find((d) => d.isSame(day, 'date'));
}

const workDaysPerEngineer = (state: State) => (engineerId: string) => {
  const sprint = sprintDays(state);

  const checkIfDayOff = getIsDayOff(state);
  const engineer = getEngineerById(state)(engineerId);
  if (!engineer) return [];
  const { daysOff } = engineer;

  const workDays: Dayjs[] = [];
  sprint.forEach((day) => {
    if (day.isOff || day.isWeekend || checkIfDayOff(day.date)) return;

    if (!daysOff.length) workDays.push(day.date);
    else {
      const isEngOff = findDayInDays(day.date, daysOff);
      if (!isEngOff) workDays.push(day.date);
    }
  });
  return workDays;
};

export const getWorkDaysPerEngineer = memoizeOne(workDaysPerEngineer);

const unassignedWorkDaysLeft = (state: State) => (engineerId: string) => {
  const workDays = workDaysPerEngineer(state)(engineerId).length;
  const usedDays = state.assignedWorks
    .filter((assignedWork) => assignedWork.engineerId === engineerId)
    .map(
      (assignedWork) =>
        state.works.find((work) => work.id === assignedWork.workId)?.estimate ??
        0
    )
    .flat();

  return workDays - sum(usedDays);
};

export const getWorkDaysLeft = memoizeOne(unassignedWorkDaysLeft);
