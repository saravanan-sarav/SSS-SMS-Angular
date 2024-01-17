import { Component } from '@angular/core';
import { el } from '@fullcalendar/core/internal-common';
import { AdminClassRoomResponse } from 'src/app/model/response/admin-class-room-response';
import { AdminService } from 'src/app/service/admin.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-admin-class',
  templateUrl: './admin-class.component.html',
  styleUrls: ['./admin-class.component.css'],
})
export class AdminClassComponent {
  classRoomDetails: AdminClassRoomResponse[] = [];

  constructor(
    private adminService: AdminService,
    private toasterService: ToasterServiceService
  ) {}

  ngOnInit(): void {
    this.adminService.getAllClassrooms().subscribe({
      next: (response: any) => {
        let studentDetails: AdminClassRoomResponse[] = response.data;
        if (studentDetails.length > 0) {
          this.classRoomDetails = studentDetails;
          this.classRoomDetails.sort((a, b) => {
            let firstNameA = a.classInCharge.toUpperCase();
            let firstNameB = b.classInCharge.toUpperCase();
            if (firstNameA < firstNameB) {
              return -1;
            }
            if (firstNameA > firstNameB) {
              return 1;
            }

            return 0;
          });
        }
      },
    });
  }

  deleteClassroom(classId: number): void {
    this.adminService.deleteClassRoom(classId).subscribe({
      next: (response: any) => {
        if (response.data == 1) {
          this.toasterService.success('Deleted Successfully', 'Classroom');
          this.ngOnInit();
        } else {
          this.toasterService.error('Something Went Wrong', 'classroom');
        }
      },
    });
  }
}
