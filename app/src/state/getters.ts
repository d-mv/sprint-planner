import dayjs, { Dayjs } from 'dayjs';
import memoizeOne from 'memoize-one';
import { omit, path, sum } from 'ramda';

import { State } from '.';
import { Work, WorkToRender } from '../entities';
import { DbWork, DbWorkToRender, FormScenario, MongoDocument, Option } from '../shared';

export const getScenarios = (state: State) => state.scenarios;

export const getScenarioByLabel =
  (label: string) =>
  (state: State): Option<FormScenario> => {
    const result = Object.entries(state.scenarios).find(([key]) => key === label);

    if (!result || !result[1]) return undefined;

    return result[1];
  };

export const getSprints = (state: State) => state.sprints;

export const getCurrentSprint = (state: State) =>
  state.sprints.find(sprint => dayjs().isBefore(sprint.endDate.add(1, 'day')));

// export const getCurrentSprint = memoizeOne(currentSprint);

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

const assignedEngineers = (state: State) =>
  state.engineers.filter(engineer => state.assignedEngineers.includes(engineer._id));

const unassignedEngineers = (state: State) =>
  state.engineers.filter(engineer => !state.assignedEngineers.includes(engineer._id));

export const getAssignedEngineers = memoizeOne(assignedEngineers);

export const getUnassignedEngineers = memoizeOne(unassignedEngineers);

export function getWorksForEngineer(state: State) {
  return function call(engineerId: string): DbWorkToRender[] {
    const assignedWorks = state.assignedWorks.filter(work => work.engineerId === engineerId);

    return assignedWorks.map(assignedWork => ({
      ...omit(['workId'], assignedWork),
      work: state.works.find(work => work._id === assignedWork.workId) as DbWork,
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

export const getWorkById = (state: State) => (workId: string) => state.works.find(work => work._id === workId);

export const getWorkDaysLeft = memoizeOne(unassignedWorkDaysLeft);

export const getAuth = (state: State) => state.auth;

export const getMessage = (state: State) => state.message;

export const getIsConnected = (state: State) => state.auth.isConnected;

export const getIsLoading = (state: State) => (key: string) => path([key], state.isLoading) ?? false;

export const getAllIsLoading = (state: State) => state.isLoading;
