import { Component } from '@angular/core';
import { StudentParentProfileRequest } from 'src/app/model/request/student-parent-profile-request';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-parent-details',
  templateUrl: './student-parent-details.component.html',
  styleUrls: ['./student-parent-details.component.css'],
})
export class StudentParentDetailsComponent {
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

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudentProfile();
  }

  getStudentProfile(): void {
    this.studentService.getParentProfile().subscribe({
      next: (response: any) => {
        this.studentParentProfile = response.data;
        console.log(this.studentParentProfile);
      },
    });
  }
}
