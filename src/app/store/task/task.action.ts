import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task';
import {TaskRequestDto} from "../../dtos/taskRequestDto";

export const loadTasks = createAction('Load Tasks');
export const loadTasksSuccess = createAction('Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('Load Tasks Failure', props<{ error: any }>());


export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ taskId: number }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());

export const addTask = createAction('[Task] Add Task', props<{ task: TaskRequestDto }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: TaskRequestDto }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: any }>());
