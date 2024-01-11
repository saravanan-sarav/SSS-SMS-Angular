import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
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
  subjectList: string[] = [];
  teacherCountWithSubject: number[] = [];
  AttendanceLabel: string[] = ['absent', 'present'];

  presentCount: number = 0;
  absentCount: number = 0;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getPresentCount();
    this.getStudentCount();
    this.getAssignmentCount();
    this.getTeacherCount();
    this.adminService.getTeacherCountWithSubject().subscribe({
      next: (response: any) => {
        this.subjectList = response.data.subject;
        this.teacherCountWithSubject = response.data.count;
      },
      complete: () => {
        this.createPieChartForTeacherCount();
      },
    });
    this.adminService.getAttendancePercentageCount().subscribe({
      next: (response: any) => {
        this.presentCount = response.data.present;
        this.absentCount = response.data.absent;
      },
      complete: () => {
        this.createPieChartForAttendanceCount();
      },
    });
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

  createPieChartForTeacherCount() {
    const ctx = document.getElementById(
      'TeacherWithSubject'
    ) as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.subjectList,
        datasets: [
          {
            data: this.teacherCountWithSubject,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
          },
        ],
      },
    });
  }

  createPieChartForAttendanceCount() {
    const ctx = document.getElementById(
      'todayPresentCount'
    ) as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.AttendanceLabel,
        datasets: [
          {
            data: [this.absentCount, this.presentCount],
            backgroundColor: [
              'rgba(255, 99, 135, 0.8)',
              'rgba(54, 162, 235, 0.8)',
            ],
          },
        ],
      },
    });
  }
}
