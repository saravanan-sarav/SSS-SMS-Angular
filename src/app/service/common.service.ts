import { Injectable } from '@angular/core';
import { ApiCommonService } from './api/api-common.service';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { AssignmentRequest } from '../model/request/assignment-request';
import { LoginAttemptRegisterRequest } from '../model/request/login-attempt-register-request';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apiCommon: ApiCommonService) {}

  getAllClass(): Observable<AppResponse> {
    return this.apiCommon.getAllClass();
  }

  getAllAssignment(): Observable<AppResponse> {
    return this.apiCommon.getAllAssignmentType();
  }

  getAllSubjects(): Observable<AppResponse> {
    return this.apiCommon.getAllSubjects();
  }

  postAssignment(
    assignmentRequest: AssignmentRequest
  ): Observable<AppResponse> {
    return this.apiCommon.postAssignment(assignmentRequest);
  }

  getAllStudentStatus(): Observable<AppResponse> {
    return this.apiCommon.getAllStudentStatus();
  }

  getAllStandard(): Observable<AppResponse> {
    return this.apiCommon.getAllStandards();
  }
  loginAttemptRegister(loginAttempt:LoginAttemptRegisterRequest): Observable<AppResponse> {
    return this.apiCommon.loginAttemptRegister(loginAttempt);
  }
}
