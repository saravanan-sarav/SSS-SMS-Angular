import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { AppResponse } from '../model/appResponse';
import { ApiStudentService } from './api/api-student.service';
import { StorageService } from './storage.service';
import { LeaveApplication } from '../model/leave-application';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(
    private apiStudentService: ApiStudentService,
    private storageService: StorageService
  ) {}

  getAttendanceData(): Observable<AppResponse> {
    return this.apiStudentService.apiGetAttendanceData(
      this.storageService.getLoggedInUser().studentId!
    );
  }

  getParentProfile(): Observable<AppResponse> {
    return this.apiStudentService.getParentDetails(
      this.storageService.getLoggedInUser().studentId!
    );
  }

  getStudentProfile(): Observable<AppResponse> {
    return this.apiStudentService.getStudentProfile(
      this.storageService.getLoggedInUser().studentId!
    );
  }
  getAssignmentList(): Observable<AppResponse> {
    return this.apiStudentService.getAssignmentList(
      this.storageService.getLoggedInUser().studentId!
    );
  }

  applyPermission(permissionApplication:LeaveApplication):Observable<AppResponse>{
    return this.apiStudentService.applyPermission(permissionApplication);
  }
}
