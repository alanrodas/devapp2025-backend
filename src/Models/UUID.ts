import { ObjectId } from 'mongoose';

export type UUID = string | ObjectId;

export type WithId<T> = T & { _id: UUID };
