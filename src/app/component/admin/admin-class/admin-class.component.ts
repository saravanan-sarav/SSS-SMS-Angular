import { Component } from '@angular/core';
import { AdminClassRoomResponse } from 'src/app/model/response/admin-class-room-response';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-class',
  templateUrl: './admin-class.component.html',
  styleUrls: ['./admin-class.component.css']
})
export class AdminClassComponent {
  classRoomDetails: AdminClassRoomResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllClassrooms().subscribe({
      next: (response: any) => {
        let studentDetails: AdminClassRoomResponse[] = response.data;
        if (studentDetails.length > 0) {
          this.classRoomDetails = studentDetails;
        }
      },
    });
  }
}
