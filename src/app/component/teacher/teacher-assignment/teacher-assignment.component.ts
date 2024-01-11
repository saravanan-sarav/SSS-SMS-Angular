import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { TeacherAssignmentResponse } from 'src/app/model/response/teacher-assignment-response';
import { StorageService } from 'src/app/service/storage.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-assignment',
  templateUrl: './teacher-assignment.component.html',
  styleUrls: ['./teacher-assignment.component.css'],
})
export class TeacherAssignmentComponent {
  options: AnimationOptions = {
    path: 'assets/AssignmentNotFound.json',
  };
  assignmentDetails: TeacherAssignmentResponse[] = [];
  filteredAssignmentDetails: TeacherAssignmentResponse[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getAllAssignments().subscribe({
      next: (response: any) => {
        let assignmentDetails: TeacherAssignmentResponse[] = response.data;
        if (assignmentDetails.length > 0) {
          this.assignmentDetails = assignmentDetails;
          this.filteredAssignmentDetails = assignmentDetails;
        }
      },
    });
  }

  filterAssignment(event: any): void {
    this.filteredAssignmentDetails = this.assignmentDetails.filter(
      (assignment) =>
        assignment.assignmentName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
  }
}
