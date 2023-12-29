import { Component, OnInit } from '@angular/core';
import { StudentAssignmentRequest } from 'src/app/model/request/student-assignment-request';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css'],
})
export class StudentAssignmentComponent implements OnInit {
  studentAssignmentList: StudentAssignmentRequest[] = [];

  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    this.getAllAssignment();
  }

  getAllAssignment(): void {
    this.studentService.getAssignmentList().subscribe({
      next: (response: any) => {
        this.studentAssignmentList = response.data;
        console.log(this.studentAssignmentList);
      },
    });
  }
}
