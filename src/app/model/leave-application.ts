export interface LeaveApplication {
  leaveTypeId: number;
  id: number;
  fromDate: string;
  toDate?: string;
  comments: string;
  fromTime?: string;
  toTime?: string;
  parentUserId: number;
  studentUserId: number;
}