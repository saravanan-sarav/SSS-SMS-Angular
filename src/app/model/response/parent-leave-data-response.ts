export interface ParentLeaveDataResponse {
  id: number;
  firstName: string;
  lastName: string;
  leaveTypeId: number;
  leaveType: string;
  appliedDate: string;
  fromDate: string;
  toDate: string | null;
  fromTime: string;
  toTime: string;
  leaveReason: string;
  comments: string;
  leaveStatusId: number;
  leaveStatus: string;
}
