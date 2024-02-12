import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}
  private URL = 'http://localhost:8080/users/';

  get() {
    this.httpClient.get(this.URL);
  }
  register(user: User) {
    return this.httpClient.post(this.URL, user);
  }

  login(userName: string, pwd: string) {
    return this.httpClient.post(this.URL + 'login', {
      userName: userName,
      pwd: pwd,
    });
  }
  storeToken(token: string) {
    this.cookieService.set('token', token, { expires: 1 });
  }

  getToken() {
    return this.cookieService.get('token');
  }
  removeToken() {
    this.cookieService.delete('token');
  }
}
