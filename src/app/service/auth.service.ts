import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT, urlEndpoint } from '../utils/constant';
import { Login } from '../model/login';
import { BehaviorSubject, Observable, Observer, map } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    if (this.storageService.getAuthData()) {
      return true;
    }
    return false;
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    if (storageService.getLoggedInUser().id != null) {
      this.setLoggedIn(storageService.getLoggedInUser());
    }
  }

  login(login: Login): Observable<AppResponse> {
    return this.http
      .post<AppResponse>(`${urlEndpoint.baseUrl}/auth/login`, login)
      .pipe(
        map((user) => {
          this.storageService.setAuthData(
            window.btoa(login.username + ':' + login.password)
          );
          return user;
        })
      );
  }

  logout() {
    this.storageService.removeAuthData();
    this.storageService.removeLoggedInUser();
    this.storageService.removeRoute();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  setLoggedIn(user: AppUser): void {
    this.storageService.setLoggedInUser(user);
    let route: string | null = this.storageService.getRoute();
    if (user.role === CONSTANT.ADMIN) {
      if (route === null) route = 'admin/home';
      this.router.navigate(['/' + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.TEACHER) {
      if (route === null) route = 'teacher/home';
      this.router.navigate(['/' + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.STUDENT) {
      if (route === null) route = 'student/home';
      this.router.navigate(['/' + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.PARENT) {
      if (route === null) route = 'parent/home';
      this.router.navigate(['/' + route], { replaceUrl: true });
    }
  }
}
