import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { TeacherAssignmentMarkEntryRequest } from 'src/app/model/request/teacher-assignment-mark-entry-request';
import { TeacherAttendanceRequestForStudent } from 'src/app/model/request/teacher-attendance-request-for-student';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiTeacherService {
  constructor(private httpClient: HttpClient) {}
  getAllAssignments(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/assignment/` + userId
    );
  }

  getAllStudents(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/myclass/` + userId
    );
  }

  getProfile(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/` + userId
    );
  }

  getStudentListForAtendance(
    classId: number | undefined
  ): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/attendance/class/` + classId
    );
  }

  markAttedanceForStudent(
    teacherAttendanceRequestForStudent: TeacherAttendanceRequestForStudent
  ): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.baseUrl}/attendance/entry`,
      teacherAttendanceRequestForStudent
    );
  }

  getAssignmentDetail(selectAssignment: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/assignment/loader/` + selectAssignment
    );
  }

  getStudentListForAssignment(assignmentId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/assignment/student/` + assignmentId
    );
  }

  entryMarkForStudent(
    assignmentEntry: TeacherAssignmentMarkEntryRequest
  ): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.teacherUrl}/assignment/markentry`,
      assignmentEntry
    );
  }

  getAllLeaveList(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.teacherUrl}/leave/all/${userId}`
    );
  }
}
