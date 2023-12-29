import { Component } from '@angular/core';
import { AdminAssignmentResponse } from 'src/app/model/response/admin-assignment-response';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-assignment',
  templateUrl: './admin-assignment.component.html',
  styleUrls: ['./admin-assignment.component.css'],
})
export class AdminAssignmentComponent {
  assignmentDetails: AdminAssignmentResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllAssignments().subscribe({
      next: (response: any) => {
        let assignmentDetails: AdminAssignmentResponse[] = response.data;
        if (assignmentDetails.length > 0) {
          this.assignmentDetails = assignmentDetails;
        }
      },
    });
  }

  isDateCompleted(inputDateString: string): boolean {
    const currentDate = new Date();
    const inputDateArray = inputDateString.split('-');
    console.log(inputDateArray);

    if (inputDateArray.length !== 3) {
      // Invalid date format
      console.error('Invalid date format');
      return false;
    }

    const inputYear = parseInt(inputDateArray[2], 10);
    const inputMonth = parseInt(inputDateArray[1], 10);
    const inputDay = parseInt(inputDateArray[0], 10);

    const inputDate = new Date(inputYear, inputMonth-1, inputDay);

    if (isNaN(inputDate.getTime())) {
      console.error('Invalid date');
      return false;
    }

    if (inputDate > currentDate) {
      return true;
    } else {
      return false;
    }
  }
}
