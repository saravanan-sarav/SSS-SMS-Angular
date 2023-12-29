import { Component } from '@angular/core';
import { AdminParentResponse } from 'src/app/model/response/admin-parent-response';
import { AdminTeacherResponse } from 'src/app/model/response/admin-teacher-response';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.component.html',
  styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent {
  parentDetails: AdminParentResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllParents().subscribe({
      next: (response: any) => {
        let parentDetails: AdminParentResponse[] = response.data;
        if (parentDetails.length > 0) {
          this.parentDetails = parentDetails;
        }
      },
    });
  }
}
