import { Component } from '@angular/core';
import { StudentAssignmentRequest } from 'src/app/model/request/student-assignment-request';
import { AuthService } from 'src/app/service/auth.service';
import { ParentService } from 'src/app/service/parent.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-parent-home',
  templateUrl: './parent-home.component.html',
  styleUrls: ['./parent-home.component.css'],
})
export class ParentHomeComponent {
  isApproved: boolean = false;

  studentAssignmentList: StudentAssignmentRequest[] = [];

  constructor(
    private parentService: ParentService,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.isApproved =
      this.storageService.getLoggedInUser().studentActiveStatus === 1
        ? false
        : true;
  }
  ngOnInit(): void {
    this.getAllAssignment();
  }

  getAllAssignment(): void {
    this.parentService.getAssignmentList().subscribe({
      next: (response: any) => {
        this.studentAssignmentList = response.data;
        console.log(this.studentAssignmentList);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
