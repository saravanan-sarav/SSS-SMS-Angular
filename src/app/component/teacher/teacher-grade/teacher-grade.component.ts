import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { TeacherAssignmentMarkEntryRequest } from 'src/app/model/request/teacher-assignment-mark-entry-request';
import { TeacherAssignmentLoaderResponse } from 'src/app/model/response/teacher-assignment-loader-response';
import { TeacherAssignmentResponse } from 'src/app/model/response/teacher-assignment-response';
import { TeacherStudentListForAssignment } from 'src/app/model/response/teacher-student-list-for-assignment';
import { TeacherService } from 'src/app/service/teacher.service';
import { NotifierService } from 'angular-notifier';
import { AnimationOptions } from 'ngx-lottie';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-teacher-grade',
  templateUrl: './teacher-grade.component.html',
  styleUrls: ['./teacher-grade.component.css'],
})
export class TeacherGradeComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  assignmentDetails: TeacherAssignmentResponse[] = [];
  assignmentId: number = 0;
  assignmentSelected: boolean = false;
  studentDetails: TeacherStudentListForAssignment[] = [];

  assignmentDeatail: TeacherAssignmentLoaderResponse = {
    assignmentId: 0,
    assignmentName: '',
    className: '',
    teacherName: '',
    subjectName: '',
    dueDate: '',
    totalMark: 0,
    minScore: 0,
  };

  constructor(
    private teacherService: TeacherService,
    private toasterService: ToasterServiceService
  ) {}

  ngOnInit(): void {
    this.teacherService.getAllAssignments().subscribe({
      next: (response: any) => {
        let assignmentDetails: TeacherAssignmentResponse[] = response.data;
        if (assignmentDetails.length > 0) {
          this.assignmentDetails = assignmentDetails;
        }
      },
    });
  }

  assignmentSelect(selectAssignment: NgModel): void {
    this.teacherService.getAssignmentDetail(selectAssignment.value).subscribe({
      next: (response: any) => {
        this.assignmentDeatail = response.data;
        this.assignmentId = selectAssignment.value;
        this.assignmentSelected = true;
        this.getstudentDetailsForAssignment();
      },
    });
  }

  getstudentDetailsForAssignment(): void {
    this.teacherService
      .getStudentListForAssignment(this.assignmentId)
      .subscribe({
        next: (response: any) => {
          this.studentDetails = response.data;
          console.log(this.studentDetails);
        },
      });
  }

  entryMark(
    assignmentGradeId: number | null,
    studentUserId: number,
    comment: string,
    obtainedMark: number
  ): void {
    let assignmentEntry: TeacherAssignmentMarkEntryRequest = {
      assignmentGradeId: assignmentGradeId != null ? assignmentGradeId : 0,
      studentUserId: studentUserId,
      assignmentId: this.assignmentId,
      markObtained: obtainedMark,
      comments: comment,
    };

    this.teacherService.entryMarkForStudent(assignmentEntry).subscribe({
      next: (response: any) => {
        this.getstudentDetailsForAssignment();
      },
      complete: () => {},
    });
    this.toasterService.success(
      'Mark Entered',
      `${this.assignmentDeatail.assignmentName}`
    );
  }
}
