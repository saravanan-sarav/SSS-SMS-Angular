import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminStudentComponent } from './component/admin/admin-student/admin-student.component';
import { AdminParentComponent } from './component/admin/admin-parent/admin-parent.component';
import { AdminAssignmentComponent } from './component/admin/admin-assignment/admin-assignment.component';
import { AdminClassComponent } from './component/admin/admin-class/admin-class.component';
import { AdminAttendanceComponent } from './component/admin/admin-attendance/admin-attendance.component';
import { TeacherHomeComponent } from './component/teacher/teacher-home/teacher-home.component';
import { TeacherClassComponent } from './component/teacher/teacher-class/teacher-class.component';
import { TeacherAssignmentComponent } from './component/teacher/teacher-assignment/teacher-assignment.component';
import { TeacherGradeComponent } from './component/teacher/teacher-grade/teacher-grade.component';
import { TeacherAttendanceComponent } from './component/teacher/teacher-attendance/teacher-attendance.component';
import { TeacherProfileComponent } from './component/teacher/teacher-profile/teacher-profile.component';
import { ParentHomeComponent } from './component/parent/parent-home/parent-home.component';
import { ParentApplicationComponent } from './component/parent/parent-application/parent-application.component';
import { ParentStudentDetailComponent } from './component/parent/parent-student-detail/parent-student-detail.component';
import { ParentStudentAttendanceComponent } from './component/parent/parent-student-attendance/parent-student-attendance.component';
import { ParentProfileComponent } from './component/parent/parent-profile/parent-profile.component';
import { StudentHomeComponent } from './component/student/student-home/student-home.component';
import { StudentAssignmentComponent } from './component/student/student-assignment/student-assignment.component';
import { StudentProfileComponent } from './component/student/student-profile/student-profile.component';
import { StudentAttendanceComponent } from './component/student/student-attendance/student-attendance.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AdminAddTeacherComponent } from './component/admin/admin-add-teacher/admin-add-teacher.component';
import { AdminCreateClassroomComponent } from './component/admin/admin-create-classroom/admin-create-classroom.component';
import { AdminTeacherComponent } from './component/admin/admin-teacher/admin-teacher.component';
import { TeacherAddAssignmentComponent } from './component/teacher/teacher-add-assignment/teacher-add-assignment.component';
import { authGuard } from './guard/auth.guard';
import { StudentParentDetailsComponent } from './component/student/student-parent-details/student-parent-details.component';
import { StudentClassRoomComponent } from './component/student/student-class-room/student-class-room.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home/students',
    component: AdminStudentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home/parents',
    component: AdminParentComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin/home/assignments',
    component: AdminAssignmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home/teachers',
    component: AdminTeacherComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home/classes',
    component: AdminClassComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home/attendance',
    component: AdminAttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/add-teacher',
    component: AdminAddTeacherComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/add-classroom',
    component: AdminCreateClassroomComponent,
    canActivate: [authGuard],
  },

  {
    path: 'teacher/home',
    component: TeacherHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/home/class',
    component: TeacherClassComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/home/assignment',
    component: TeacherAssignmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/home/grade',
    component: TeacherGradeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/home/attendance',
    component: TeacherAttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/home/profile',
    component: TeacherProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher/add-assignment',
    component: TeacherAddAssignmentComponent,
    canActivate: [authGuard],
  },

  {
    path: 'parent/home',
    component: ParentHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'parent/application',
    component: ParentApplicationComponent,
  },
  {
    path: 'parent/home/studentdetail',
    component: ParentStudentDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'parent/home/studentattendance',
    component: ParentStudentAttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'parent/home/profile',
    component: ParentProfileComponent,
    canActivate: [authGuard],
  },

  {
    path: 'student/home',
    component: StudentHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/home/assignments',
    component: StudentAssignmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/home/profile',
    component: StudentProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/home/attendance',
    component: StudentAttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/home/parent',
    component: StudentParentDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/home/classroom',
    component: StudentClassRoomComponent,
    canActivate: [authGuard],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
