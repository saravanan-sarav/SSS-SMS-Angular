import { Component } from '@angular/core';
import { AdminTeacherResponse } from 'src/app/model/response/admin-teacher-response';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css'],
})
export class AdminTeacherComponent {
  teacherDetails: AdminTeacherResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllTeachers().subscribe({
      next: (response: any) => {
        let teacherDetails: AdminTeacherResponse[] = response.data;
        if (teacherDetails.length > 0) {
          this.teacherDetails = teacherDetails;
        }
      },
    });
  }
}
