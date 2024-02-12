import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task = new Task();
  @Output() onDeleteTask: EventEmitter<any> = new EventEmitter();
  @Output() onCheckTask: EventEmitter<any> = new EventEmitter();
  des = false;
  deleteTask() {
    this.onDeleteTask.emit();
  }

  showDes() {
    this.des = !this.des;
  }
  onCheck() {
    this.onCheckTask.emit();
  }
}
