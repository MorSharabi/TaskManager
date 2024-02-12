import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SocketioService } from 'src/app/services/socketio/socketio.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  constructor(private socketService: SocketioService) {}
  task: Task = new Task();
  @Input() userName = 'user';
  @Output() onNewTask: EventEmitter<Task> = new EventEmitter();
  addNewTask() {
    this.task.userName = this.userName;
    this.onNewTask.emit(this.task)
    // console.log(this.socketService.socket);
  }
}
