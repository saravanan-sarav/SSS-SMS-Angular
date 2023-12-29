export interface AddAssignment {
  assignmentId: number;
  teacherUserId: number;
  classId: number | undefined;
  assignmentTypeId: number;
  deadline: string;
  totalGrade: number;
  minScore: number;
}
