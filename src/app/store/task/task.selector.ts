import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';
import {Task} from "../../models/task";

export const selectTaskState = createFeatureSelector<fromTask.TaskState>('tasks');

export const selectTasks = createSelector(
  selectTaskState,
  fromTask.selectTasks
);

export const selectTasksByStatus = (status: string) =>
  createSelector(
    selectTasks,
    (tasks: Task[]) => tasks.filter((task) => task.status === status)
  );

export const selectLoading = createSelector(
  selectTaskState,
  fromTask.selectLoading
);

export const selectError = createSelector(
  selectTaskState,
  fromTask.selectError
);

export const TaskSelectors = {
  selectTaskState,
  selectTasks,
  selectTasksByStatus,
  selectLoading,
  selectError,
};
