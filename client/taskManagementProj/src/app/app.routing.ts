import { RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
export const routing = RouterModule.forRoot(appRoutes);
