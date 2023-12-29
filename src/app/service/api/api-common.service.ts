import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { AssignmentRequest } from 'src/app/model/request/assignment-request';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiCommonService {
  constructor(private httpClient: HttpClient) {}

  getAllClass(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/classroom/all`
    );
  }
  getAllAssignmentType(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/assignment/assignmentType`
    );
  }

  getAllSubjects(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/subject/all`
    );
  }

  postAssignment(
    assignmentRequest: AssignmentRequest
  ): Observable<AppResponse> {
    return this.httpClient.post<AppResponse>(
      `${urlEndpoint.baseUrl}/assignment`,
      assignmentRequest
    );
  }

  getAllStudentStatus(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/status`
    );
  }

  getAllStandards(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.adminUrl}/standard/all`
    );
  }  
}
