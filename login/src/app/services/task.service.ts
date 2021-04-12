import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Task {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost/tictacdo/api/tasks';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[Task]>(this.url);
  }

  get(id: string) {
    return this.http.get<Task>(this.url + '/' + id);
  }

  create(task: Task) {
    return this.http.post(this.url, task);
  }
  update(task: Task, id: string) {
    return this.http.put(this.url + '/' + id, task);
  }
  remove(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

}
