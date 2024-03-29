import { OnInit, Component } from '@angular/core';
import { el } from '@fullcalendar/core/internal-common';
import { AnimationOptions } from 'ngx-lottie';
import { TeacherLeaveStatusChangeRequest } from 'src/app/model/request/teacher-leave-status-change-request';
import { TeacherLeaveDataResponse } from 'src/app/model/response/teacher-leave-data-response';
import { TeacherService } from 'src/app/service/teacher.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-teacher-leave-tracker',
  templateUrl: './teacher-leave-tracker.component.html',
  styleUrls: ['./teacher-leave-tracker.component.css'],
})
export class TeacherLeaveTrackerComponent implements OnInit {
  leaveDataList: TeacherLeaveDataResponse[] = [];
  filterResult: String = '';
  TypeFilterLeaveData: TeacherLeaveDataResponse[] = [];
  updatedDataList: TeacherLeaveDataResponse[] = [];
  leave: boolean = true;
  permission: boolean = false;

  options: AnimationOptions = {
    path: '/assets/NoLeaveDataFound.json',
  };

  constructor(
    private teacherService: TeacherService,
    private toasterService: ToasterServiceService
  ) {}
  ngOnInit(): void {
    this.teacherService.getAllLeaveList().subscribe({
      next: (response: any) => {
        this.leaveDataList = response.data;
        this.loadData();
      },
    });
  }

  loadData(): void {
    if (this.leave) {
      this.TypeFilterLeaveData = this.leaveDataList.filter(
        (leave) => leave.leaveTypeId == 1
      );
    } else {
      this.TypeFilterLeaveData = this.leaveDataList.filter(
        (leave) => leave.leaveTypeId != 1
      );
    }
    this.changeStatus(1);
  }

  changeStatus(statusId: number): void {
    if (statusId == 4 || statusId == 0) {
      if (statusId == 0) {
      } else {
        this.updatedDataList = this.TypeFilterLeaveData;
      }
    } else {
      this.updatedDataList = this.TypeFilterLeaveData.filter(
        (leaveData) => leaveData.leaveStatus == statusId
      );
    }
    switch (statusId) {
      case statusId == 1 ? statusId : 0:
        this.filterResult = 'Pending';
        break;

      case statusId == 2 ? statusId : 0:
        this.filterResult = 'Approved';
        break;

      case statusId == 3 ? statusId : 0:
        this.filterResult = 'Reject';
        break;
    }
  }

  changeStatusPermission(): void {
    this.leave = false;
    this.permission = true;
    this.loadData();
  }

  changeStatusLeave(): void {
    this.leave = true;
    this.permission = false;
    this.loadData();
  }

  leaveStatusChange(statusId: number, id: number): void {
    let leaveStatusChange: TeacherLeaveStatusChangeRequest = {
      statusId: statusId,
      id: id,
    };
    this.teacherService.leaveStatusChange(leaveStatusChange).subscribe({
      next: (response: any) => {
        if (response.data == 1) {
          this.toasterService.success('Updated', 'Leave');
        } else {
          this.toasterService.error('Something Went Wrong', 'Leave');
        }
        this.ngOnInit();
      },
    });
  }
}
