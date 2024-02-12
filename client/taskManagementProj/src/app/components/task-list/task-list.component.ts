import { Component } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: Task[] = [];
  doneTaskList: Task[] = [];
  showNew = false;
  userName: string = '';

  constructor(
    private taksService: TaskService,
    private socketService: SocketioService
  ) {
    this.socketService.setupSocketConnetion();

    this.socketService.socket.on('setUserName', (data: string) => {
      this.userName = data;
    });

    this.socketService.onNewConnection();

    this.socketService.socket.on('onDelete', (id: any) => {
      const deletedTaskIndex = this.taskList.findIndex(
        (task) => task._id == id
      );
      if (deletedTaskIndex != -1) {
        if (this.taskList[deletedTaskIndex].isDone == false) {
          this.taskList.splice(deletedTaskIndex, 1);
        } else {
          this.doneTaskList.splice(deletedTaskIndex, 1);
        }
      }
    });

    this.socketService.socket.on('onNewTask', (model: any) => {
      this.getData();
    });

    this.socketService.socket.on('onTaskChecked', () => {
      this.taksService.get().subscribe((data) => {
        this.getData();
      });
    });
    this.getData();
  }
  getData() {
    this.taksService.get().subscribe(
      (data) => {
        const allTasks = data as Task[];
        this.taskList = allTasks.filter((task) => !task.isDone).reverse();
        this.doneTaskList = allTasks.filter((task) => task.isDone).reverse();
      },
      (err) => {
        window.location.href = '';
      }
    );
  }
  async deleteTaskHandler(id: string) {
    this.taksService.delete(id).subscribe(
      (data) => {
        alert('Task deleted successfully.');
        this.socketService.onDelete(id);
      },
      (error) => {
        alert('Error: ' + error);
      }
    );
  }
  //
  async newTaskHandler(model: Task) {
    this.taksService.post(model).subscribe((data) => {
      this.socketService.onNewTask(data as Task);
      this.showNew = false;
    });
  }

  showNewOnClick() {
    this.showNew = !this.showNew;
  }

  taskCheckHandler(id: string, done: boolean) {
    let task: Task = new Task();
    let index = -1;
    if (!done) {
      index = this.taskList.findIndex((task) => task._id == id);
      task = this.taskList[index];
    } else {
      index = this.doneTaskList.findIndex((task) => task._id == id);
      task = this.doneTaskList[index];
    }
    task.isDone = !task.isDone;
    this.taksService.put(task).subscribe((data) => {
      this.socketService.onTaskChecked();
    });
  }
}
