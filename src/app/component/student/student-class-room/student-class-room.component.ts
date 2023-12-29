import { Component, OnInit } from '@angular/core';
import { StudentTeacherDetailsResponse } from 'src/app/model/request/student-teacher-details-response';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-class-room',
  templateUrl: './student-class-room.component.html',
  styleUrls: ['./student-class-room.component.css'],
})
export class StudentClassRoomComponent implements OnInit {
  classDetails: StudentTeacherDetailsResponse = {
    classId: 0,
    classStandard: '',
    classInChargeId: 0,
    classInChargeName: '',
    classInChargePhone: '',
    classInChargeEmail: '',
    tamilTeacherId: 0,
    tamilTeacherName: '',
    tamilTeacherPhone: '',
    tamilTeacherEmail: '',
    englishTeacherId: 0,
    englishTeacherName: '',
    englishTeacherPhone: '',
    englishTeacherEmail: '',
    mathsTeacherId: 0,
    mathsTeacherName: '',
    mathsTeacherPhone: '',
    mathsTeacherEmail: '',
    scienceTeacherId: 0,
    scienceTeacherName: '',
    scienceTeacherPhone: '',
    scienceTeacherEmail: '',
    socialTeacherId: 0,
    socialTeacherName: '',
    socialTeacherPhone: '',
    socialTeacherEmail: '',
  };
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getTeacherList();
  }

  getTeacherList(): void {
    this.studentService.getClassRoomDetails().subscribe({
      next: (response: any) => {
        this.classDetails = response.data;
        console.log(this.classDetails);
      },
    });
  }
}
