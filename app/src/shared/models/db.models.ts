import { Dayjs } from 'dayjs';

import { AssignedWork, Sprint, Work, WorkToRender } from '../../entities';

export type MongoDocument<T> = T & { _id: string; createdAt: Date; updatedAt: Date };

export type DbAssignedWork<T = Dayjs> = MongoDocument<AssignedWork<T>>;

export type DbWorkToRender = MongoDocument<WorkToRender>;

export type DbWork = MongoDocument<Work>;

export type DbSprint<T = Dayjs> = MongoDocument<Sprint<T>>;
