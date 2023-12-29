import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiStudentService {
  constructor(private httpClient: HttpClient) {}

  apiGetAttendanceData(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.studentUrl}/attendance/${userId}`
    );
  }

  getClassRoomDetails(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.studentUrl}/teacher/details/${userId}`
    );
  }

  getStudentProfile(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.studentUrl}/${userId}`
    );
  }
  getParentDetails(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.studentUrl}/parent/${userId}`
    );
  }

  getAssignmentList(userId: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.studentUrl}/assignment/${userId}`
    );
  }

  registerStudent(studentRegistration: Register): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.parentUrl}/register`,
      studentRegistration
    );
  }
}
