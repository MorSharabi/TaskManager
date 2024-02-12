import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { routing } from './app.routing';
import { TaskComponent } from './components/task/task.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, TaskListComponent, TaskComponent, NewTaskComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, routing],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
