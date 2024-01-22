import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  isApproved: boolean = true;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.isApproved =
      this.storageService.getLoggedInUser().studentActiveStatus === 2
        ? false
        : true;
  }
  logout(): void {
    this.authService.logout();
  }
}
