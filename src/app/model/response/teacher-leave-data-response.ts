export interface TeacherLeaveDataResponse {
  id: number;
  firstName: string;
  lastName: string;
  leaveTypeId: 1;
  leaveType: string;
  appliedDate: string;
  fromDate: string;
  toDate: string | null;
  fromTime: null | string;
  toTime: null | string;
  leaveReason: string;
  comments: string;
  leaveStatus: number;
}
