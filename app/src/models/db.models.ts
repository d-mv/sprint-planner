export type MongoDocument<T> = T & { _id: string; createdAt: Date; updatedAt: Date };
