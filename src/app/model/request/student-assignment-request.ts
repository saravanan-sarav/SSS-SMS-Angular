export interface StudentAssignmentRequest {
  assignmentId: number;
  assignmentType: string;
  comments: string | null;
  subjects: string;
  createdDate: string;
  submitComments: string;
  obtainedMark: number;
  totalMark: number;
  minMark: number;
  dueDate: string;
}
