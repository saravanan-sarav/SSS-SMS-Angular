export interface TeacherStudentListForAssignment {
  studentUserid: number;
  assignmentGradeId: number | null;
  firstName: string;
  lastName: string;
  totalMark: number;
  comments: string | null;
  studentMark: number | null;
}
