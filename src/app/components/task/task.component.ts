import { Component } from '@angular/core';
import {TaskSelectors} from "../../store/task/task.selector";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Task} from "../../models/task";
import * as TaskActions from '../../store/task/task.action';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskRequestDto} from '../../dtos/taskRequestDto'


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
  taskForm: FormGroup;

  toggleAddTaskForm(task: Task | null): void {
    this.taskForm.patchValue({
      id: task?.id,
      name: task?.name || '',
      description: task?.description || '',
      tags: (task?.tags.map(t => t.name) || []).join('#'),
      debutDate: task?.debutDate || '',
      deadline: task?.deadline || '',
      priority: task?.priority || '',
      status: task?.status || '',
    });
    this.showTaskForm = !this.showTaskForm;
  }
  constructor(private fb: FormBuilder, private store: Store) {
    this.tasks$ = this.store.select(TaskSelectors.selectTasks);
    this.loading = this.store.select(TaskSelectors.selectLoading);
    this.error = this.store.select(TaskSelectors.selectError);
    this.tasksInProgress$ = this.store.select(TaskSelectors.selectTasksByStatus("INPROGRESS"))
    this.tasksDone$ = this.store.select(TaskSelectors.selectTasksByStatus("DONE"))
    this.tasksToDo$ = this.store.select(TaskSelectors.selectTasksByStatus("TODO"))
    this.taskForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      debutDate: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(task: Task): void {
    if (task) {
      this.store.dispatch(TaskActions.deleteTask({ taskId: task.id }));
    }
  }

  onSubmit() {
      if(this.taskForm.valid){
        const taskData: TaskRequestDto = {
          id: this.taskForm.value.id,
          name: this.taskForm.value.name,
          description: this.taskForm.value.description,
          tags: this.taskForm.value.tags.split('#'),
          created_by_id: 1,
          status: this.taskForm.value.status,
          priority: this.taskForm.value.priority,
          debutDate: this.taskForm.value.debutDate,
          deadline: this.taskForm.value.deadline,
        };
        if(taskData.id!=null) this.store.dispatch(TaskActions.updateTask({ task: taskData }))
        else this.store.dispatch(TaskActions.addTask({ task: taskData }));
        this.taskForm.reset();
        this.showTaskForm = !this.showTaskForm;
      }
  }
}
