import { Component, OnInit } from '@angular/core';
import { TeacherAttendanceStudentList } from 'src/app/model/response/teacher-attendance-student-list';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.css'],
})
export class TeacherAttendanceComponent implements OnInit {
  studentListForAttendance: TeacherAttendanceStudentList[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    this.teacherService.getStudentListForAttendance().subscribe({
      next: (response: any) => {
        this.studentListForAttendance = response.data;
        console.log(this.studentListForAttendance);
      },
    });
  }

  markAttendance(studentId: number): void {
    this.teacherService.markAttendanceforStudent(studentId).subscribe({
      next: (response: any) => {
        console.log('hello');

        this.getStudentList();
      },
    });
  }
}
