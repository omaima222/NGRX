import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/task";
import {TaskRequestDto} from "../dtos/taskRequestDto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private task_url = "http://localhost:8080/api/task";
  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.task_url);
  }

  delete(taskId: number, userId: number): Observable<void> {
    return this.httpClient.delete<void>(this.task_url+'/'+taskId+'/'+userId);
  }

  add(task: TaskRequestDto): Observable<Task>{
    return this.httpClient.post<Task>(this.task_url, task);
  }

  update(task: TaskRequestDto): Observable<Task> {
    return this.httpClient.put<Task>(this.task_url+'/'+task.id, task);
  }
}

