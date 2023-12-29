import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeacherCreatedResponse } from 'src/app/model/response/teacher-created-response';
import { SubjectName } from 'src/app/model/subject';
import { Teacher } from 'src/app/model/teacher';
import { AdminService } from 'src/app/service/admin.service';
import { CommonService } from 'src/app/service/common.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-admin-add-teacher',
  templateUrl: './admin-add-teacher.component.html',
  styleUrls: ['./admin-add-teacher.component.css'],
})
export class AdminAddTeacherComponent {
  teacherUserId: number = 0;
  addressId: number = 0;

  maxDate: string;

  subjects: SubjectName[] = [];

  dateofBirth: string = '';

  isSubmitted: boolean = false;
  hide: boolean = true;

  teacherCreatedNotification: TeacherCreatedResponse = {
    teacherUserId: 0,
    addressId: 0,
    teacherName: '',
    teacherUsername: '',
    password: '',
    email: '',
  };

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private toasterService: ToasterServiceService
  ) {
    const today = new Date();
    const maxAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxDate = maxAgeDate.toISOString().split('T')[0];
    this.getAllSubjects();
  }

  getAllSubjects(): void {
    this.commonService.getAllSubjects().subscribe({
      next: (response: any) => {
        this.subjects = response.data;
      },
    });
  }

  addTeacherAdmin(addTeacher: NgForm): void {
    console.log(addTeacher.value);
    let teacher: Teacher = {
      teacherUserId: addTeacher.value.teacherUserId,
      addressId: addTeacher.value.addressId,
      teacherUsername: addTeacher.value.teacherUsername,
      teacherPassword: addTeacher.value.teacherPassword,
      firstName: addTeacher.value.firstName,
      lastname: addTeacher.value.lastname,
      phoneNumber: addTeacher.value.phoneNumber,
      email: addTeacher.value.email,
      dateOfBirth: addTeacher.value.dateOfBirth,
      subjectId: addTeacher.value.subjectId,
      doorNum: addTeacher.value.doorNum,
      street: addTeacher.value.street,
      addrLine: addTeacher.value.addrLine,
      city: addTeacher.value.city,
      state: addTeacher.value.state,
      pincode: addTeacher.value.pincode,
      gender: addTeacher.value.gender,
    };
    // this.dateofBirth = teacher.dateOfBirth;
    if (teacher.teacherUserId === 0) {
      this.adminService.addTeacher(teacher).subscribe({
        next: (response: any) => {
          this.teacherCreatedNotification = response.data;
          this.isSubmitted = true;
        },
      });
      this.toasterService.warning('Successfully Completed');
    }
  }

  calculateAge(dateOfBirth: string): number | null {
    const birthdate = new Date(dateOfBirth);
    const today = new Date();

    if (isNaN(birthdate.getTime())) {
      return null;
    }

    const age = today.getFullYear() - birthdate.getFullYear();

    if (
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate())
    ) {
      return age - 1;
    }
    return age;
  }

  togglePassword(): void {
    this.hide = !this.hide;
  }
}
