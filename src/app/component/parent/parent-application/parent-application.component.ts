import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { Standard } from 'src/app/model/standard';
import { CommonService } from 'src/app/service/common.service';
import { StudentService } from 'src/app/service/student.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-parent-application',
  templateUrl: './parent-application.component.html',
  styleUrls: ['./parent-application.component.css'],
})
export class ParentApplicationComponent implements OnInit {
  standardList: Standard[] = [];

  maxDate: string;
  parentUserId: number = 0;
  studentUserId: number = 0;
  addressId: number = 0;

  constructor(
    private commonService: CommonService,
    private studentService: StudentService,
    private router: Router,
    private toasterService: ToasterServiceService
  ) {
    const today = new Date();
    const maxAgeDate = new Date(
      today.getFullYear() - 9,
      today.getMonth(),
      today.getDate()
    );
    this.maxDate = maxAgeDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.commonService.getAllStandard().subscribe({
      next: (response: any) => {
        this.standardList = response.data;
      },
    });
  }

  registration(addStudent: NgForm): void {
    let studentRegistration: Register = {
      parentUserId: addStudent.value.parentUserId,
      studentUserId: addStudent.value.studentUserId,
      addressId: addStudent.value.addressId,
      firstName: addStudent.value.firstName,
      lastName: addStudent.value.lastName,
      dateOfBirth: addStudent.value.dateOfBirth,
      gender: addStudent.value.gender,
      classId: addStudent.value.classId,
      motherName: addStudent.value.motherName,
      motherPhoneNumber: addStudent.value.motherPhoneNumber,
      motherOccupation: addStudent.value.motherOccupation,
      fatherName: addStudent.value.fatherName,
      fatherPhoneNumber: addStudent.value.fatherPhoneNumber,
      fatherOccupation: addStudent.value.fatherOccupation,
      email: addStudent.value.email,
      doorNum: addStudent.value.doorNum,
      street: addStudent.value.street,
      addrLine: addStudent.value.addrLine,
      city: addStudent.value.city,
      state: addStudent.value.state,
      pincode: addStudent.value.pincode,
      studentUsername: addStudent.value.studentUsername,
      studentPassword: addStudent.value.studentPassword,
      parentUsername: addStudent.value.parentUsername,
      parentPassword: addStudent.value.parentPassword,
    };
    console.log(studentRegistration);

    this.studentService.registerStudent(studentRegistration).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.toasterService.success('Successfully Registered');
      },
    });
    this.router.navigate(['/login'], { replaceUrl: true });
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
}
