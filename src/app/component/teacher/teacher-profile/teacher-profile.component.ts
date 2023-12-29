import { Component } from '@angular/core';
import { TeacherProfileResponse } from 'src/app/model/response/teacher-profile-response';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
})
export class TeacherProfileComponent {
  teacherProfile: TeacherProfileResponse = {
    teacherUserId: 0,
    addressId: 0,
    teacherUsername: '',
    firstName: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    gender:'',
    dateOfBirth: '',
    dateOfJoin:'',
    subjectName: '',
    doorNum: '',
    street: '',
    addrLine: '',
    city: '',
    state: '',
    pincode: 0,
  };

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeacherProfile().subscribe({
      next: (response: any) => {
        let teacherProfile: TeacherProfileResponse = response.data;
        if (teacherProfile) {
          this.teacherProfile = teacherProfile;
        }
      },
    });
  }
}
