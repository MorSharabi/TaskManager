import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  constructor(private userService: UserService) {}

  login() {
    this.userService.login(this.user.userName, this.user.pwd).subscribe(
      async (data: any) => {
        this.userService.storeToken(data.token);
        alert('User Login Success');
        window.location.href = 'tasks';
      },
      (err) => {
        alert('User Login Error');
      }
    );
  }
}
