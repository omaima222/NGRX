import { Component } from '@angular/core';
import {TaskSelectors} from "../../store/task/task.selector";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Task} from "../../models/task";
import * as TaskActions from '../../store/task/task.action';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: '../../../assets/style/main.css'
})
export class TaskComponent {
  tasks$: Observable<Task[]>;
  tasksInProgress$: Observable<Task[]>;
  tasksToDo$: Observable<Task[]>;
  tasksDone$: Observable<Task[]>;
  loading: Observable<boolean>;
  error: Observable<any>;
  showTaskForm: boolean = false;

  toggleAddTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
  }

  constructor(private store: Store) {
    this.tasks$ = this.store.select(TaskSelectors.selectTasks);
    this.loading = this.store.select(TaskSelectors.selectLoading);
    this.error = this.store.select(TaskSelectors.selectError);
    this.tasksInProgress$ = this.store.select(TaskSelectors.selectTasksByStatus("INPROGRESS"))
    this.tasksDone$ = this.store.select(TaskSelectors.selectTasksByStatus("DONE"))
    this.tasksToDo$ = this.store.select(TaskSelectors.selectTasksByStatus("TODO"))
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(task: Task): void {
    if (task) {
      this.store.dispatch(TaskActions.deleteTask({ taskId: task.id }));
    }
  }
  createTask(): void {

  }
}
