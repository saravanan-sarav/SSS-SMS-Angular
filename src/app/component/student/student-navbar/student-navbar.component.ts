import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent {
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
