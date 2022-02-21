import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Todo } from '../../shared/models/todo';

@Injectable()
export class TodoService {
  private readonly TODOS_URL = 'todos';

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks(): Observable<Todo[]> {
    return this.pipeLine(this.http.get<Todo[]>(`${this.TODOS_URL}`));
  }

  deleteTask(targetTask: Todo): Observable<Todo> {
    return this.pipeLine(this.http.delete(`${this.TODOS_URL}/${targetTask.id}`));
  }

  changeTask(targetTask: Todo): Observable<Todo> {
    return this.pipeLine(this.http.patch(`${this.TODOS_URL}/${targetTask.id}`, targetTask));
  }

  addTask(targetTask: Todo): Observable<Todo> {
    return this.pipeLine(this.http.post<Todo>(`${this.TODOS_URL}`, targetTask));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log('[ERROR]', error);
    return EMPTY;
  }

  pipeLine<T>(task: Observable<T>): Observable<T> {
    return task.pipe(retry(4), catchError(this.errorHandler));
  }
}
