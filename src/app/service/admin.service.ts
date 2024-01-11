import { Injectable } from '@angular/core';
import { ApiAdminService } from './api/api-admin.service';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Teacher } from '../model/teacher';
import { AdminStudentApprove } from '../model/request/admin-student-approve';
import { AdminCreateClassRoom } from '../model/response/admin-create-class-room';
import { StudentService } from './student.service';
import { ApiStudentService } from './api/api-student.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private apiAdminService: ApiAdminService,
    private apiStudentService: ApiStudentService
  ) {}

  getAllStudents(): Observable<AppResponse> {
    return this.apiAdminService.getAllStudentDetails();
  }

  getAllTeachers(): Observable<AppResponse> {
    return this.apiAdminService.getAllTeacherDetails();
  }

  getAllClassrooms(): Observable<AppResponse> {
    return this.apiAdminService.getAllClassRoomDetails();
  }

  getAllAssignments(): Observable<AppResponse> {
    return this.apiAdminService.getAllAssignmentDetails();
  }

  getAllParents(): Observable<AppResponse> {
    return this.apiAdminService.getAllParentDetails();
  }

  addTeacher(teacher: Teacher): Observable<AppResponse> {
    return this.apiAdminService.addTeacherAdmin(teacher);
  }

  approveStudent(studentAprove: AdminStudentApprove): Observable<AppResponse> {
    return this.apiAdminService.approveStudent(studentAprove);
  }

  getAllTeacherList(): Observable<AppResponse> {
    return this.apiAdminService.getAllTeacherList();
  }

  createClassroom(
    createClassRoomRequest: AdminCreateClassRoom
  ): Observable<AppResponse> {
    return this.apiAdminService.createClassroom(createClassRoomRequest);
  }

  getAttendanceData(userId: number): Observable<AppResponse> {
    return this.apiStudentService.apiGetAttendanceData(userId);
  }

  getStudentListForAttendance(classId: number): Observable<AppResponse> {
    return this.apiAdminService.getStudentListForAttendance(classId);
  }

  getTodayAttendanceCount(): Observable<AppResponse> {
    return this.apiAdminService.getTodayAttendanceCount();
  }

  getStudentReport(userId: number): Observable<AppResponse> {
    return this.apiAdminService.getStudentReport(userId);
  }

  getTeacherCountWithSubject(): Observable<AppResponse> {
    return this.apiAdminService.getTeacherCountWithSubject();
  }

  getAttendancePercentageCount(): Observable<AppResponse> {
    return this.apiAdminService.getAttendancePercentageCount();
  }
}
