import { Component, OnInit } from '@angular/core';
import { TeacherClassroomResponse } from 'src/app/model/response/teacher-classroom-response';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css'],
})
export class TeacherClassComponent implements OnInit {
  classStudentDetails: TeacherClassroomResponse[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getClassStudents().subscribe({
      next: (response: any) => {
        let classStudentDetails: TeacherClassroomResponse[] = response.data;
        if (classStudentDetails.length > 0) {
          this.classStudentDetails = classStudentDetails;
          console.log(classStudentDetails);
        }
      },
    });
  }
}
