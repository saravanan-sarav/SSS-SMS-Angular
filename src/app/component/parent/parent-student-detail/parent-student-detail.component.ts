import { Component, OnInit } from '@angular/core';
import { StudentProfileRequest } from 'src/app/model/request/student-profile-request';
import { ParentService } from 'src/app/service/parent.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-parent-student-detail',
  templateUrl: './parent-student-detail.component.html',
  styleUrls: ['./parent-student-detail.component.css'],
})
export class ParentStudentDetailComponent implements OnInit {
  studentProfile: StudentProfileRequest = {
    studentId: 0,
    addressId: 0,
    studentFirstName: '',
    studentLastName: '',
    classStandard: '',
    gender: '',
    studentStatus: '',
    dateOfBirth: '',
    dateOfJoin: '',
    doorNum: '',
    street: '',
    addrLine: '',
    city: '',
    state: '',
    pincode: 0,
  };

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.getStudentProfile();
  }

  getStudentProfile(): void {
    this.parentService.getStudentProfile().subscribe({
      next: (response: any) => {
        this.studentProfile = response.data;
        console.log(this.studentProfile);
      },
    });
  }
}
