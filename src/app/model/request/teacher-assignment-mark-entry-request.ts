export interface TeacherAssignmentMarkEntryRequest {
  assignmentGradeId: number | null;
  studentUserId: number;
  assignmentId: number;
  markObtained: number;
  comments: string;
}
