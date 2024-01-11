import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentType } from 'src/app/model/assignment-type';
import { CLassList } from 'src/app/model/class-list';
import { AssignmentRequest } from 'src/app/model/request/assignment-request';
import { SubjectName } from 'src/app/model/subject';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-teacher-add-assignment',
  templateUrl: './teacher-add-assignment.component.html',
  styleUrls: ['./teacher-add-assignment.component.css'],
})
export class TeacherAddAssignmentComponent implements OnInit {
  teacherSubjectId: number | undefined = 0;
  teacherClassId: number | undefined = 0;

  class: CLassList[] = [];
  assignmentType: AssignmentType[] = [];
  filteredAssignmentType: AssignmentType[] = [];
  subjects: SubjectName[] = [];

  isSelected = false;

  assignmentId: number = 0;
  minMark: number = 0;
  totalGrade: number = 0;
  assignmentTypeSelection: string = '';

  todayDate: string = this.getFormattedDate();

  getFormattedDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
  ngOnInit(): void {}

  constructor(
    private storageService: StorageService,
    private commonService: CommonService,
    private router: Router,
    private toasterService: ToasterServiceService
  ) {
    this.teacherSubjectId = storageService.getLoggedInUser().subjectId;
    this.teacherClassId = storageService.getLoggedInUser().teacherClassId;
    this.getClassList();
    this.getAssignmentType();
    this.getAllSubjects();
  }

  getClassList(): void {
    this.commonService.getAllClass().subscribe({
      next: (response: any) => {
        this.class = response.data;
      },
    });
  }

  getAssignmentType(): void {
    this.commonService.getAllAssignment().subscribe({
      next: (response: any) => {
        this.assignmentType = response.data;
      },
    });
  }

  getAllSubjects(): void {
    this.commonService.getAllSubjects().subscribe({
      next: (response: any) => {
        this.subjects = response.data;
      },
    });
  }

  addAssignmentTeacher(addAssigment: NgForm): void {
    console.log(addAssigment.value);
    let assTypeId: AssignmentType | undefined = this.assignmentType.find(
      (assignmentType) =>
        assignmentType.assignmentType === addAssigment.value.assignmentType
    );
    if (assTypeId?.assignmentId != undefined) {
      let assignmentRequest: AssignmentRequest = {
        assignmentId: addAssigment.value.assignmentId,
        assignmentTypeId: assTypeId?.assignmentId!,
        teacherUserId: this.storageService.getLoggedInUser().id,
        classId: addAssigment.value.classId,
        subjectId: addAssigment.value.subjectId,
        deadline: addAssigment.value.deadline,
        totalGrade: addAssigment.value.totalGrade,
        minScore: addAssigment.value.minScore,
        comments: addAssigment.value.comments,
      };
      console.log(assignmentRequest);
      this.commonService.postAssignment(assignmentRequest).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/teacher/home/assignment'], {
            replaceUrl: true,
          });
          this.toasterService.success('Assignment Added Successfully');
        },
      });
    } else {
      this.toasterService.warning(
        'Please select the AssignmentType!',
        'Add Assignment'
      );
    }
  }

  filterItems(): void {
    if (this.assignmentTypeSelection == '') {
      this.filteredAssignmentType = [];
    } else {
      this.filteredAssignmentType = this.assignmentType.filter((item) =>
        item.assignmentType
          .toLowerCase()
          .includes(this.assignmentTypeSelection.toLowerCase())
      );
    }
    console.log('called');
  }

  selectAssignmentType(value: string): void {
    this.assignmentTypeSelection = value;
    this.filteredAssignmentType = [];
  }
}
