import { Injectable, OnInit } from '@angular/core';
import { ApiTeacherService } from './api/api-teacher.service';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { TeacherAttendanceRequestForStudent } from '../model/request/teacher-attendance-request-for-student';
import { TeacherAssignmentMarkEntryRequest } from '../model/request/teacher-assignment-mark-entry-request';

@Injectable({
  providedIn: 'root',
})
export class TeacherService implements OnInit {
  constructor(
    private apiTeacherService: ApiTeacherService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  getAllAssignments(): Observable<AppResponse> {
    return this.apiTeacherService.getAllAssignments(
      this.storageService.getLoggedInUser().id
    );
  }

  getClassStudents(): Observable<AppResponse> {
    return this.apiTeacherService.getAllStudents(
      this.storageService.getLoggedInUser().id
    );
  }

  getTeacherProfile(): Observable<AppResponse> {
    return this.apiTeacherService.getProfile(
      this.storageService.getLoggedInUser().id
    );
  }

  getStudentListForAttendance(): Observable<AppResponse> {
    return this.apiTeacherService.getStudentListForAtendance(
      this.storageService.getLoggedInUser().teacherClassId
    );
  }

  markAttendanceforStudent(studentuserId: number): Observable<AppResponse> {
    let teacherAttendanceRequest: TeacherAttendanceRequestForStudent = {
      studentUserId: studentuserId,
      classId: this.storageService.getLoggedInUser().teacherClassId,
    };
    return this.apiTeacherService.markAttedanceForStudent(
      teacherAttendanceRequest
    );
  }

  getAssignmentDetail(selectAssignment: number): Observable<AppResponse> {
    return this.apiTeacherService.getAssignmentDetail(selectAssignment);
  }

  getStudentListForAssignment(assignmentId: number): Observable<AppResponse> {
    return this.apiTeacherService.getStudentListForAssignment(assignmentId);
  }

  entryMarkForStudent(
    assignmentEntry: TeacherAssignmentMarkEntryRequest
  ): Observable<AppResponse> {
    return this.apiTeacherService.entryMarkForStudent(assignmentEntry);
  }

  getAllLeaveList(): Observable<AppResponse> {
    return this.apiTeacherService.getAllLeaveList(
      this.storageService.getLoggedInUser().id
    );
  }
}
