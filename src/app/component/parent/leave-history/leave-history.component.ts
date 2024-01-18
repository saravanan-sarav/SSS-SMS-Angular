import { Component } from '@angular/core';
import { el, s } from '@fullcalendar/core/internal-common';
import { AnimationOptions } from 'ngx-lottie';
import { elementAt } from 'rxjs';
import { ParentLeaveDataResponse } from 'src/app/model/response/parent-leave-data-response';
import { TeacherLeaveDataResponse } from 'src/app/model/response/teacher-leave-data-response';
import { ParentService } from 'src/app/service/parent.service';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css'],
})
export class LeaveHistoryComponent {
  leaveDataList: ParentLeaveDataResponse[] = [];
  filterResult: String = '';
  TypeFilterLeaveData: ParentLeaveDataResponse[] = [];
  updatedDataList: ParentLeaveDataResponse[] = [];
  leave: boolean = true;
  permission: boolean = false;

  options: AnimationOptions = {
    path: '/assets/NoLeaveDataFound.json',
  };

  constructor(private parentService: ParentService) {}
  ngOnInit(): void {
    this.parentService.getLeaveHistory().subscribe({
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
    this.changeStatus(4);
  }

  changeStatus(statusId: number): void {
    if (statusId == 4 || statusId == 0) {
      if (statusId == 0) {
      } else {
        this.updatedDataList = this.TypeFilterLeaveData;
      }
    } else {
      this.updatedDataList = this.TypeFilterLeaveData.filter(
        (leaveData) => leaveData.leaveStatusId == statusId
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
  statusIndicator(statusId: number): boolean {
    if (statusId == 3) {
      return false;
    } else if (statusId == 2) {
      return true;
    } else {
      return false;
    }
  }

  statusIndicatorPending(statusId: number): boolean {
    return statusId === 1;
  }

  statusIndicatorRejected(statusId: number): boolean {
    return statusId === 3;
  }

  statusIndicatorApproved(statusId: number): boolean {
    return statusId === 2;
  }
}
