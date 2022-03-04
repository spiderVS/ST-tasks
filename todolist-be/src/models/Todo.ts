import { Types, Schema, model } from "mongoose";
import { ITodo } from "../interfaces/models/todo";

const todoSchema = new Schema<ITodo>({
  message: {
    required: true,
    type: String,
    unique: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  id: Types.ObjectId,
  deletedAt: {
    type: String,
    default: null
  }
});

export default model<ITodo>('Todo', todoSchema);
