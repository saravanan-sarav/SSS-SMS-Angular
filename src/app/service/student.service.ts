import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { ApiStudentService } from './api/api-student.service';
import { StorageService } from './storage.service';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private apiStudentService: ApiStudentService,
    private storageService: StorageService
  ) {}

  getAttendanceData(): Observable<AppResponse> {
    return this.apiStudentService.apiGetAttendanceData(
      this.storageService.getLoggedInUser().id
    );
  }
  updateAttendance(date: string, status: string) {}

  getClassRoomDetails(): Observable<AppResponse> {
    return this.apiStudentService.getClassRoomDetails(
      this.storageService.getLoggedInUser().id
    );
  }

  getStudentProfile(): Observable<AppResponse> {
    return this.apiStudentService.getStudentProfile(
      this.storageService.getLoggedInUser().id
    );
  }

  getParentProfile(): Observable<AppResponse> {
    return this.apiStudentService.getParentDetails(
      this.storageService.getLoggedInUser().id
    );
  }

  getAssignmentList(): Observable<AppResponse> {
    return this.apiStudentService.getAssignmentList(
      this.storageService.getLoggedInUser().id
    );
  }

  registerStudent(studentRegistration:Register): Observable<AppResponse> {
    return this.apiStudentService.registerStudent(studentRegistration);
  }
}
