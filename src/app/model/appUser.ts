export interface AppUser {
  id: number;
  username: string;
  name: string;
  role: string;
  teacherClassId?: number;
  subjectId?: number;
  studentId?: number;
  studentClassId?: number;
  parentId?: number;
  studentActiveStatus?: number;
}
