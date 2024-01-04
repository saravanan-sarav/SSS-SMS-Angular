import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { AdminStudentApprove } from 'src/app/model/request/admin-student-approve';
import { AdminClassRoomResponse } from 'src/app/model/response/admin-class-room-response';
import { AdminCreateClassRoom } from 'src/app/model/response/admin-create-class-room';
import { Teacher } from 'src/app/model/teacher';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private httpClient: HttpClient) {}

  getAllStudentDetails(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/students/all`
    );
  }

  getAllTeacherDetails(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/teachers/all`
    );
  }

  getAllClassRoomDetails(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/classroom/all`
    );
  }

  getAllAssignmentDetails(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/assignments/all`
    );
  }

  getAllParentDetails(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/parents/all`
    );
  }

  addTeacherAdmin(teacher: Teacher): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.adminUrl}/teacher`,
      teacher
    );
  }

  approveStudent(studentApprove: AdminStudentApprove): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.adminUrl}/studentupdate`,
      studentApprove
    );
  }

  getAllTeacherList(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/add/classroom/teacher/all`
    );
  }
  createClassroom(
    createClassRoomRequest: AdminCreateClassRoom
  ): Observable<AppResponse> {
    console.log('api call came');

    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.baseUrl}/classroom`,
      createClassRoomRequest
    );
  }

  getStudentListForAttendance(classId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/attendance/students/${classId}`
    );
  }

  getTodayAttendanceCount(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/today/present`
    );
  }

  getStudentReport(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/report/${userId}`
    );
  }
}
