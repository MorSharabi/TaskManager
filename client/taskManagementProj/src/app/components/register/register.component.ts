import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();
  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.user).subscribe(
      (data) => {
        alert('User registration successful');
        this.login();
      },
      (err) => {
        alert('User registration failed');
      }
    );
  }
  login() {
    this.userService.login(this.user.userName, this.user.pwd).subscribe(
      (data: any) => {
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
