import { Component, OnInit } from '@angular/core';
import { StudentParentProfileRequest } from 'src/app/model/request/student-parent-profile-request';
import { ParentService } from 'src/app/service/parent.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css'],
})
export class ParentProfileComponent implements OnInit {
  studentParentProfile: StudentParentProfileRequest = {
    parentId: 0,
    fatherName: '',
    fatherOccupation: '',
    fatherPhoneNumber: '',
    motherName: '',
    motherOccupation: '',
    motherPhoneNumber: '',
    email: '',
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
    this.parentService.getParentProfile().subscribe({
      next: (response: any) => {
        this.studentParentProfile = response.data;
        console.log(this.studentParentProfile);
      },
    });
  }
}
