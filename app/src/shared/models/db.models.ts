import { Dayjs } from 'dayjs';

import { AssignedWork, DayType, EngineerType, Sprint, Work, WorkToRender } from '../../entities';

export type MongoDocument<T> = T & { _id: string; createdAt: Date; updatedAt: Date };

export type DbAssignedWork<T = Dayjs> = MongoDocument<AssignedWork<T>>;

export type DbWorkToRender = MongoDocument<WorkToRender>;

export type DbWork = MongoDocument<Work>;

export type DbSprint<T = Dayjs> = MongoDocument<Sprint<T>>;

export type DbDate<T = Dayjs> = MongoDocument<DayType<T>>;

export type DbScenario = MongoDocument<{ label: string; stringified: string }>;

export type DbEngineer<T = Dayjs> = MongoDocument<EngineerType<T>>;
