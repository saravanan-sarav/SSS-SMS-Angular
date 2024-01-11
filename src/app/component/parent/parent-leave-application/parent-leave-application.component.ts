import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { el } from '@fullcalendar/core/internal-common';
import { AnimationOptions } from 'ngx-lottie';
import { LeaveApplication } from 'src/app/model/leave-application';
import { ParentService } from 'src/app/service/parent.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterServiceService } from 'src/app/service/toaster-service.service';

@Component({
  selector: 'app-parent-leave-application',
  templateUrl: './parent-leave-application.component.html',
  styleUrls: ['./parent-leave-application.component.css'],
})
export class ParentLeaveApplicationComponent {
  options: AnimationOptions = {
    path: '/assets/applyleave.json',
    rendererSettings: {
      className: 'lottie-leave-application',
    },
  };
  todayDate: string = this.getFormattedDate();

  leave: boolean = true;
  permission: boolean = false;

  constructor(
    private storageService: StorageService,
    private parentService: ParentService,
    private toasterService: ToasterServiceService,
    private router: Router
  ) {}

  leaveApplication(leaveApplication: NgForm): void {
    if (this.permission) {
      if (
        leaveApplication.value.fromDate &&
        leaveApplication.value.comments &&
        leaveApplication.value.fromTime &&
        leaveApplication.value.toTime
      ) {
        let permissionApply: LeaveApplication = {
          leaveTypeId: 2,
          id: 0,
          fromDate: leaveApplication.value.fromDate,
          comments: leaveApplication.value.comments,
          fromTime: leaveApplication.value.fromTime,
          toTime: leaveApplication.value.toTime,
          parentUserId: this.storageService.getLoggedInUser().id,
          studentUserId: this.storageService.getLoggedInUser().studentId!,
        };
        console.log(permissionApply);

        this.parentService.applyPermission(permissionApply).subscribe({
          next: (response: any) => {
            this.toasterService.success('Request Sent to ClassIncharge');
            this.router.navigate(['/parent/home'], { replaceUrl: true });
          },
        });
      } else {
        this.toasterService.error('Please Fill All Fields');
      }
    } else {
      if (
        leaveApplication.value.fromDate &&
        leaveApplication.value.toDate &&
        leaveApplication.value.comments
      ) {
        let leaveApply: LeaveApplication = {
          leaveTypeId: 1,
          id: 0,
          fromDate: leaveApplication.value.fromDate,
          toDate: leaveApplication.value.toDate,
          comments: leaveApplication.value.comments,
          parentUserId: this.storageService.getLoggedInUser().id,
          studentUserId: this.storageService.getLoggedInUser().studentId!,
        };
        this.parentService.applyPermission(leaveApply).subscribe({
          next: (response: any) => {
            this.toasterService.success(
              'Request Sent to ClassIncharge',
              'Leave Application'
            );
            this.router.navigate(['/parent/home'], { replaceUrl: true });
          },
        });
      } else {
        this.toasterService.error('Please Fill All Fields');
      }
    }
  }

  getFormattedDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
  changeStatusPermission(): void {
    this.leave = false;
    this.permission = true;
  }

  changeStatusLeave(): void {
    this.leave = true;
    this.permission = false;
  }
}
