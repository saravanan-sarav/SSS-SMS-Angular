import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css'],
})
export class TeacherNavbarComponent implements OnInit {
  LoginUserName: string = '';
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.LoginUserName = this.storageService.getLoggedInUser().name;
  }
}
