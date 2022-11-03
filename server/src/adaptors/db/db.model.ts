import { Types } from 'mongoose';

export type MongoDocument<T> = T & { _id: string | Types.ObjectId; createdAt: Date; updatedAt: Date };
