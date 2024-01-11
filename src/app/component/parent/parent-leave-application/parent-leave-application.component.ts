import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { LeaveApplication } from 'src/app/model/leave-application';
import { LeaveApplyResponse } from 'src/app/model/response/leave-apply-response';
import { LeaveReason } from 'src/app/model/response/leave-reason';
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

  recentLeaveApplication: LeaveApplyResponse = {
    studentFirstName: '',
    studentLastName: '',
    fromDate: '',
    toDate: '',
    fromTime: '',
    toTime: '',
    comments: '',
    leaveStatus: '',
    leaveReason: '',
    leaveType: '',
    applyDate: '',
  };

  dateParts: string[] = [];

  fromTime: string[] = [];
  toTime: string[] = [];

  leaveReasonList: LeaveReason[] = [];

  constructor(
    private storageService: StorageService,
    private parentService: ParentService,
    private toasterService: ToasterServiceService,
    private router: Router
  ) {
    this.getLeaveReason();
    this.getRecentApplication();
  }

  leaveApplication(leaveApplication: NgForm): void {
    if (this.permission) {
      if (
        leaveApplication.value.fromDate &&
        leaveApplication.value.comments &&
        leaveApplication.value.fromTime &&
        leaveApplication.value.toTime &&
        leaveApplication.value.reason
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
          leaveReasonId: leaveApplication.value.reason,
        };
        console.log(permissionApply);

        this.parentService.applyPermission(permissionApply).subscribe({
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
    } else {
      if (
        leaveApplication.value.fromDate &&
        leaveApplication.value.toDate &&
        leaveApplication.value.comments &&
        leaveApplication.value.reason
      ) {
        let leaveApply: LeaveApplication = {
          leaveTypeId: 1,
          id: 0,
          fromDate: leaveApplication.value.fromDate,
          toDate: leaveApplication.value.toDate,
          comments: leaveApplication.value.comments,
          parentUserId: this.storageService.getLoggedInUser().id,
          studentUserId: this.storageService.getLoggedInUser().studentId!,
          leaveReasonId: leaveApplication.value.reason,
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

  getLeaveReason(): void {
    this.parentService.getLeaveReason().subscribe({
      next: (response: any) => {
        this.leaveReasonList = response.data;
      },
    });
  }

  getRecentApplication(): void {
    this.parentService.getRecentApplication().subscribe({
      next: (response: any) => {
        this.dateParts = this.splitDateAndTime(response.data.applyDate);
        this.fromTime = this.splitTimeAndFormat(response.data.fromTime);
        this.toTime = this.splitTimeAndFormat(response.data.toTime);
        this.recentLeaveApplication = response.data;
      },
    });
  }
  splitDateAndTime(dateTimeString: string): string[] {
    const [datePart, timePart] = dateTimeString.split('T');

    const [year, month, day] = datePart.split('-');

    const [hour, minute, secondAndMillis] = timePart.split(':');
    const [second] = secondAndMillis.split('.');

    const { formattedHour, ampm } = this.convertTo12HourFormat(
      parseInt(hour, 10)
    );
    // Returning the parts as an array
    return [year, month, day, formattedHour, minute, second, ampm];
  }

  splitTimeAndFormat(timeString: string): string[] {
    console.log(timeString);

    const [hour, minute, secondAndMillis] = timeString.split(':');
    const { formattedHour, ampm } = this.convertTo12HourFormat(
      parseInt(hour, 10)
    );
    // Returning the parts as an array
    return [formattedHour, minute, ampm];
  }

  convertTo12HourFormat(hour24: number): {
    formattedHour: string;
    ampm: string;
  } {
    // Convert to 12-hour format
    let formattedHour: string;
    let ampm: string;

    if (hour24 === 0) {
      formattedHour = '12';
      ampm = 'AM';
    } else if (hour24 < 12) {
      formattedHour = hour24.toString();
      ampm = 'AM';
    } else if (hour24 === 12) {
      formattedHour = '12';
      ampm = 'PM';
    } else {
      formattedHour = (hour24 - 12).toString();
      ampm = 'PM';
    }

    return { formattedHour, ampm };
  }

  leaveStatus(): boolean {
    let status = this.recentLeaveApplication.leaveStatus;
    if (status == 'APPROVED') {
      return true;
    } else {
      return false;
    }
  }

  calculateDays(): number {
    let fromDate: Date = new Date(this.recentLeaveApplication.fromDate);
    let toDate: Date = new Date(this.recentLeaveApplication.toDate);
    const oneDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.round(
      Math.abs((toDate.getTime() - fromDate.getTime()) / oneDay)
    );
    return daysDifference;
  }
}
