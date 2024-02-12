import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Task } from 'src/app/models/task.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;
  private URL = 'http://localhost:8080';

  constructor(private userService: UserService) {}

  setupSocketConnetion() {
    this.socket = io(this.URL, {
      query: { token: this.userService.getToken() },
    });
  }

  onNewConnection() {
    this.socket.emit('getUserName');
  }

  //EXMP for socket event:
  onDelete(id: string) {
    this.socket.emit('Delete', id);
  }

  onNewTask(model: Task) {
    this.socket.emit('newTask', model);
  }
  onTaskChecked() {
    this.socket.emit('taskChecked');
    
  }
}
