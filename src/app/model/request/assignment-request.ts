export interface AssignmentRequest {
  assignmentId: number;
  teacherUserId: number;
  classId: number;
  subjectId: number;
  assignmentTypeId: number;
  deadline: string;
  totalGrade: string;
  minScore: string;
  comments: string;
}
