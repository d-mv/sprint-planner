import { Dayjs } from 'dayjs';
import memoizeOne from 'memoize-one';
import { omit, path, sum } from 'ramda';

import { State } from '.';
import { WorkToRender } from '../entities';
import { MongoDocument, Option } from '../models';

export const getSprints = (state: State) => state.sprints;

export const getItemsLength = memoizeOne(getSprints);

export const getDaysOff = (state: State) => state.daysOff;

export const getIsDayOff = (state: State) => (day?: Option<Dayjs>) =>
  day ? Boolean(state.daysOff.find(d => d.isSame(day, 'date'))) : false;

export const getEngineers = (state: State) => state.engineers;

export const getEngineerById = (state: State) => (engineerId: string) =>
  state.engineers.find(engineer => engineer._id === engineerId);

export const getDaysOffForEngineer = (state: State) => (engineerId: string) =>
  state.engineers.find(engineer => engineer._id === engineerId)?.daysOff ?? [];

export const getIsEngineerAdded = (state: State) => (engineerId: string) =>
  Boolean(state.engineers.find(engineer => engineer._id === engineerId));

const addedEngineers = (state: State) =>
  state.engineers.filter(engineer => state.addedEngineers.includes(engineer._id));

const notAddedEngineers = (state: State) =>
  state.engineers.filter(engineer => !state.addedEngineers.includes(engineer._id));

export const getAddedEngineers = memoizeOne(addedEngineers);

export const getNotAddedEngineers = memoizeOne(notAddedEngineers);

export function getWorksForEngineer(state: State) {
  return function call(engineerId: string): MongoDocument<WorkToRender>[] {
    const assignedWorks = state.assignedWorks.filter(work => work.engineerId === engineerId);

    return assignedWorks.map(assignedWork => ({
      ...omit(['workId'], assignedWork),
      work: state.works.find(work => work._id === assignedWork.workId)!,
    }));
  };
}

export function getWorksForEngineerPerSprint(state: State) {
  return function call(engineerId: string) {
    return function call2(sprintId: string): WorkToRender[] {
      const sprint = state.sprints.find(sprint => sprint._id === sprintId);

      if (!sprint) return [];

      const assignedWorks = state.assignedWorks.filter(
        work => work.engineerId === engineerId && work.startDate.isBefore(sprint.endDate),
      );

      if (!assignedWorks.length) return [];

      return assignedWorks.map(assignedWork => {
        return { ...omit(['workId'], assignedWork), work: state.works.find(work => work._id === assignedWork.workId)! };
      });
    };
  };
}

function unAssignedWorks(state: State) {
  const assignedIds = state.assignedWorks.map(el => el.workId);

  return state.works.filter(work => !assignedIds.includes(work._id));
}

export const getUnAssignedWorks = memoizeOne(unAssignedWorks);

const unAssignedWorksQty = (state: State) => unAssignedWorks(state).length;

export const getUnAssignedWorksQty = memoizeOne(unAssignedWorksQty);

const sprintDays = (state: State) => state.sprints.map(sprint => sprint.days).flat();

export const getSprintDays = memoizeOne(sprintDays);

export function findDayInDays(day: Dayjs, days: Dayjs[]): Option<Dayjs> {
  if (!days.length) return undefined;

  return days.find(d => d.isSame(day, 'date'));
}

const workDaysPerEngineer = (state: State) => (engineerId: string) => {
  const sprint = sprintDays(state);

  const checkIfDayOff = getIsDayOff(state);

  const engineer = getEngineerById(state)(engineerId);

  if (!engineer) return [];

  const { daysOff } = engineer;

  const workDays: Dayjs[] = [];

  sprint.forEach(day => {
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
    .filter(assignedWork => assignedWork.engineerId === engineerId)
    .map(assignedWork => state.works.find(work => work._id === assignedWork.workId)?.estimate ?? 0)
    .flat();

  return workDays - sum(usedDays);
};

export const getWorkDaysLeft = memoizeOne(unassignedWorkDaysLeft);

export const getAuth = (state: State) => state.auth;

export const getAuthError = (state: State) => state.auth.error;

export const getIsConnected = (state: State) => state.auth.isConnected;

export const getIsLoading = (state: State) => (key: string) => path([key], state.isLoading) ?? false;
