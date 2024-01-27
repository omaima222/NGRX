import { Component } from '@angular/core';
import {TaskSelectors} from "../../store/task/task.selector";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Task} from "../../models/task";
import * as TaskActions from '../../store/task/task.action';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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
  submitted = false;

  toggleAddTaskForm(task: Task | null): void {
    this.submitted = false;
    this.taskForm.patchValue({
      id: task?.id,
      name: task?.name || '',
      description: task?.description || '',
      tags: (task?.tags.map(t => t.name) || []).join(' '),
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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: ['', [Validators.required, this.tagsValidator]],
      debutDate: ['', [Validators.required, this.debutDateValidator]],
      deadline: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  debutDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const now = new Date();
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    if (selectedDate && (selectedDate < now || selectedDate > threeDaysFromNow)) {
      return { debutDateError: true };
    }
    return null;
  }

  tagsValidator(control: AbstractControl): ValidationErrors | null {
    console.log("tags:", control.value)
    const tags = control.value.split(" ").filter((tag: string) => tag !== '')
    console.log(tags)
    if(tags.length<2){
      return { tagsLengthError : true }
    }
    return null;
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
      this.submitted = true;
      if(this.taskForm.valid){
        const taskData: TaskRequestDto = {
          id: this.taskForm.value.id,
          name: this.taskForm.value.name,
          description: this.taskForm.value.description,
          tags: this.taskForm.value.tags.split(' ').filter((tag: string) => tag !== ''),
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
