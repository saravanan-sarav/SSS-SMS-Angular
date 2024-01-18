import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { AdminTeacherComponent } from './component/admin/admin-teacher/admin-teacher.component';
import { AdminStudentComponent } from './component/admin/admin-student/admin-student.component';
import { AdminAssignmentComponent } from './component/admin/admin-assignment/admin-assignment.component';
import { AdminClassComponent } from './component/admin/admin-class/admin-class.component';
import { AdminParentComponent } from './component/admin/admin-parent/admin-parent.component';
import { TeacherHomeComponent } from './component/teacher/teacher-home/teacher-home.component';
import { TeacherClassComponent } from './component/teacher/teacher-class/teacher-class.component';
import { TeacherAssignmentComponent } from './component/teacher/teacher-assignment/teacher-assignment.component';
import { TeacherGradeComponent } from './component/teacher/teacher-grade/teacher-grade.component';
import { TeacherAttendanceComponent } from './component/teacher/teacher-attendance/teacher-attendance.component';
import { TeacherProfileComponent } from './component/teacher/teacher-profile/teacher-profile.component';
import { ParentHomeComponent } from './component/parent/parent-home/parent-home.component';
import { ParentStudentDetailComponent } from './component/parent/parent-student-detail/parent-student-detail.component';
import { ParentStudentAttendanceComponent } from './component/parent/parent-student-attendance/parent-student-attendance.component';
import { ParentProfileComponent } from './component/parent/parent-profile/parent-profile.component';
import { StudentProfileComponent } from './component/student/student-profile/student-profile.component';
import { StudentHomeComponent } from './component/student/student-home/student-home.component';
import { StudentAttendanceComponent } from './component/student/student-attendance/student-attendance.component';
import { StudentAssignmentComponent } from './component/student/student-assignment/student-assignment.component';
import { AdminNavbarComponent } from './component/admin/admin-navbar/admin-navbar.component';
import { StudentNavbarComponent } from './component/student/student-navbar/student-navbar.component';
import { ParentNavbarComponent } from './component/parent/parent-navbar/parent-navbar.component';
import { TeacherNavbarComponent } from './component/teacher/teacher-navbar/teacher-navbar.component';
import { ParentApplicationComponent } from './component/parent/parent-application/parent-application.component';
import { AdminAttendanceComponent } from './component/admin/admin-attendance/admin-attendance.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AdminAddTeacherComponent } from './component/admin/admin-add-teacher/admin-add-teacher.component';
import { AdminCreateClassroomComponent } from './component/admin/admin-create-classroom/admin-create-classroom.component';
import { ParentSidebarComponent } from './component/parent/parent-sidebar/parent-sidebar.component';
import { AdminSidebarComponent } from './component/admin/admin-sidebar/admin-sidebar.component';
import { TeacherSidebarComponent } from './component/teacher/teacher-sidebar/teacher-sidebar.component';
import { StudentSidebarComponent } from './component/student/student-sidebar/student-sidebar.component';
import { TeacherAddAssignmentComponent } from './component/teacher/teacher-add-assignment/teacher-add-assignment.component';
import { StudentParentDetailsComponent } from './component/student/student-parent-details/student-parent-details.component';
import { StudentClassRoomComponent } from './component/student/student-class-room/student-class-room.component';
import { RegisterationNavbarComponent } from './component/parent/registeration-navbar/registeration-navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { TeacherLeaveTrackerComponent } from './component/teacher/teacher-leave-tracker/teacher-leave-tracker.component';
import { ParentLeaveApplicationComponent } from './component/parent/parent-leave-application/parent-leave-application.component';
import { LeaveHistoryComponent } from './component/parent/leave-history/leave-history.component';

export function playerFactory() {
  return player;
}
export function pluginsCalender() {
  return [dayGridPlugin];
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    AdminTeacherComponent,
    AdminStudentComponent,
    AdminAssignmentComponent,
    AdminClassComponent,
    AdminParentComponent,
    TeacherHomeComponent,
    TeacherClassComponent,
    TeacherAssignmentComponent,
    TeacherGradeComponent,
    TeacherAttendanceComponent,
    TeacherProfileComponent,
    ParentHomeComponent,
    ParentStudentDetailComponent,
    ParentStudentAttendanceComponent,
    ParentProfileComponent,
    StudentProfileComponent,
    StudentHomeComponent,
    StudentAttendanceComponent,
    StudentAssignmentComponent,
    AdminNavbarComponent,
    StudentNavbarComponent,
    ParentNavbarComponent,
    TeacherNavbarComponent,
    ParentApplicationComponent,
    AdminAttendanceComponent,
    PageNotFoundComponent,
    AdminAddTeacherComponent,
    AdminHomeComponent,
    AdminCreateClassroomComponent,
    ParentSidebarComponent,
    AdminSidebarComponent,
    TeacherSidebarComponent,
    StudentSidebarComponent,
    TeacherAddAssignmentComponent,
    StudentParentDetailsComponent,
    StudentClassRoomComponent,
    RegisterationNavbarComponent,
    TeacherLeaveTrackerComponent,
    ParentLeaveApplicationComponent,
    LeaveHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    FullCalendarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 5000,
      maxOpened: 5,
      autoDismiss: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
