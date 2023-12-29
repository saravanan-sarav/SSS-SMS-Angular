import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  teacherCount: number = 0;
  studentCount: number = 0;
  assignmentCount: number = 0;
  todayPresent: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getPresentCount();
    this.getStudentCount();
    this.getAssignmentCount();
    this.getTeacherCount();
  }

  getStudentCount(): void {
    this.adminService.getAllStudents().subscribe({
      next: (response: any) => {
        this.studentCount = response.data.length;
      },
    });
  }

  getTeacherCount(): void {
    this.adminService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teacherCount = response.data.length;
      },
    });
  }

  getAssignmentCount(): void {
    this.adminService.getAllAssignments().subscribe({
      next: (response: any) => {
        this.assignmentCount = response.data.length;
      },
    });
  }

  getPresentCount(): void {
    this.adminService.getTodayAttendanceCount().subscribe({
      next: (response: any) => {
        this.todayPresent = response.data;
      },
    });
  }
}
