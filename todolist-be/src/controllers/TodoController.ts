import { ITodo } from "../interfaces/models/todo";
import TodoModel from '../models/Todo'
import { Request, Response, NextFunction } from "express";
import jsonstream from 'jsonstream';

const checkQuery = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query;
  if (!(page && limit)) {
    return next();
  } else {
    try {
      const pageToNum: number = Number(page);
      const limitToNum: number = Number(limit);

      TodoModel.find(
        { deletedAt: null },
        {
          deletedAt: 0,
          __v: 0
        })
      .limit(limitToNum)
      .skip((pageToNum - 1) * limitToNum)
      .cursor()
      .pipe(jsonstream.stringify())
      .pipe(res.type('json'));

    } catch(err: unknown) {
      if (err instanceof Error) {
        console.log('[ERROR]', err.message);
      }
      res.status(500).json({});
    }
  }
}

const getAll = (req: Request, res: Response) => {
  try {
    TodoModel.find(
      { deletedAt: null },
      {
        deletedAt: 0,
        __v: 0
      })
    .cursor()
    .pipe(jsonstream.stringify())
    .pipe(res.type('json'));
  } catch {
    res.status(500).json({});
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel
    .findById(
      id,
      {
        deletedAt: 0,
        __v: 0
      })
    .findOne({ deletedAt: null });
    res.json(todo);
  } catch(err: unknown) {
    if (err instanceof Error) {
      console.log('[ERROR]', err.message);
    }
    res.status(404).json({});
  }
};

const createOne = async (req: Request, res: Response) => {
  try {
    const { message, completed }: ITodo = req.body;
    const todo = new TodoModel(
    {
      message: message,
      completed: completed
    });
    const { _id } = await todo.save();
    const todoToSave = await TodoModel.findById(
      _id,
      {
        deletedAt: 0,
        __v: 0
      })
    res.status(201).json(todoToSave);
  }
  catch(err: unknown) {
    if (err instanceof Error) {
      console.log('[ERROR]', err.message);
    }
    res.status(400).json({error: 'duplicate key error collection'});
  }
}

const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo: ITodo = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo,
      { new: true,
        select: {
          deletedAt: 0,
          __v: 0
        }
      });
    if (!updatedTodo) {
      throw new Error(`Element with id ${id} not found`);
    }
    res.status(200).json(updatedTodo);
  } catch(err: unknown) {
    if (err instanceof Error) {
      console.log('[ERROR]', err.message);
    }
    res.status(500).json({});
  }
}

const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TodoModel.updateOne({ _id: id }, { deletedAt: `${Date.now()}` });
    res.status(200).json({});
  } catch {
    res.status(500).json({});
  }
}

const badPath = async (req: Request, res: Response) => {
  res.sendStatus(404);
}

export { checkQuery, getOne, getAll, createOne, updateOne, deleteOne, badPath };
