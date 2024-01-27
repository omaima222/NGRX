import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TaskActions from './task.action';
import { TaskService } from '../../services/task.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() => this.taskService.getAllTasks()
      .pipe(
        map(tasks => TaskActions.loadTasksSuccess({ tasks })),
        catchError(error => of(TaskActions.loadTasksFailure({ error })))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(({ taskId }) => this.taskService.delete(taskId, 1)
      .pipe(
        map(() => TaskActions.deleteTaskSuccess({ taskId })),
        catchError(error => of(TaskActions.deleteTaskFailure({ error })))
      )
    )
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(({ task }) => this.taskService.add(task)
      .pipe(
        map(newTask => TaskActions.addTaskSuccess({ task: newTask })),
        catchError(error => of(TaskActions.addTaskFailure({ error })))
      )
    )
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTask),
    mergeMap(({ task }) => this.taskService.update(task)
      .pipe(
        map(newTask => TaskActions.updateTaskSuccess({ task: newTask })),
        catchError(error => of(TaskActions.updateTaskFailure({ error })))
      )
    )
  ));

}
