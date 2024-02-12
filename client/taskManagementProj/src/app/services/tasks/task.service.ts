import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}
  private URL = 'http://localhost:8080/tasks/';

  get() {
    return this.httpClient.get(this.URL, {
      headers: {
        Authorization: this.userService.getToken() as string,
      },
    });
  }
  delete(id: string) {
    return this.httpClient.delete(this.URL + id, {
      headers: { Authorization: this.userService.getToken() as string },
    });
  }

  post(model: Task) {
    return this.httpClient.post(this.URL, model, {
      headers: { Authorization: this.userService.getToken() as string },
    });
  }

  put(model: Task) {
    return this.httpClient.put(this.URL + model._id, model, {
      headers: { Authorization: this.userService.getToken() as string },
    });
  }
}
