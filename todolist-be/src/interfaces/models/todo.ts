import { Types } from 'mongoose';

export interface ITodo {
  message: string,
  completed?: boolean,
  id?: Types.ObjectId | string,
  deletedAt?: string | null
}
