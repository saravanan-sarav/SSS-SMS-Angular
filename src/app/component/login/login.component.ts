import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  latitude: number = 0;
  longitude: number = 0;
  username: string = '';
  password: String = '';
  error: String = '';
  responseReturn: string = '';

  constructor(
    private authService: AuthService,
    private toasterService: ToasterServiceService,
    private http: HttpClient
  ) {
    this.getIpAddress();
  }

  getIpAddress(): string {
    let apiUrl = 'https://ipapi.co/json/';
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.responseReturn = response.ip;
      },
    });
    return this.responseReturn;
  }

  login(_loginForm: Form): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          if (latitude && longitude) {
            // Login Attempt Mail Sending
            this.authService
              .loginAttemptRegister(
                this.username,
                latitude,
                longitude,
                this.responseReturn
              )
              .subscribe({
                next: (response: any) => {},
              });
            // Login API request
            this.authService.login(login).subscribe({
              next: (response: AppResponse) => {
                let user: AppUser = response.data;
                this.authService.setLoggedIn(user);
                this.toasterService.success('LoggedIn successsfully');
              },
              error: (err) => {
                console.log(err);
                let message: String = err.error.error.message;
                this.error = message.includes(',')
                  ? message.split(',')[0]
                  : message;
              },
            });
          }
        },
        (error) => {
          this.toasterService.warning('Please Give Location Access', 'Login');
        }
      );
    } else {
      this.toasterService.error(
        'Geolocation is not supported by this browser,User Trustable Browser to Login',
        'Login'
      );
    }
  }
}
