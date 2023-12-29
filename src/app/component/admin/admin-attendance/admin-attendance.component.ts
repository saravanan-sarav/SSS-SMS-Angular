import { Component } from '@angular/core';
import { StudentAttendanceResponse } from 'src/app/model/response/student-attendance-response';
import { StudentService } from 'src/app/service/student.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AdminService } from 'src/app/service/admin.service';
import { CLassList } from 'src/app/model/class-list';
import { AdminClassListOfStudents } from 'src/app/model/response/admin-class-list-of-students';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css'],
})
export class AdminAttendanceComponent {
  classList: CLassList[] = [];

  classStudentList: AdminClassListOfStudents[] = [];
  classId: number = 0;
  dataReceived: boolean = false;
  userId: number = 7;
  calendarEvents: any = [];
  currentMonth: number = 0;
  currentYear: number = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // businessHours: this.getBusinessHours(),
  };

  constructor(
    private adminService: AdminService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.getClassList();
  }

  updateCalendar() {
    this.adminService.getAttendanceData(this.userId).subscribe({
      next: (response: any) => {
        let studentAttendanceData: StudentAttendanceResponse = response.data;
        if (studentAttendanceData !== null) {
          console.log(studentAttendanceData.date);
          this.generateCalendarEvents(
            studentAttendanceData.date,
            new Date(studentAttendanceData.joinedDate),
            new Date()
          );
          this.dataReceived = true;
        }
      },
    });
  }

  generateCalendarEvents(
    apiResponse: string[],
    startDate: Date,
    endDate: Date
  ): void {
    const events = [];

    // Loop through each day from start date to end date
    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      // Exclude Saturdays (day 6) and Sundays (day 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const dateStr = currentDate.toISOString().split('T')[0];

        if (apiResponse.includes(dateStr)) {
          events.push({
            title: 'Present',
            date: dateStr,
            color: 'green',
          });
        } else {
          events.push({
            title: 'Absent',
            date: dateStr,
            color: 'red',
          });
        }
      } else {
        // For Saturdays and Sundays, mark as holiday
        const dateStr = currentDate.toISOString().split('T')[0];
        events.push({
          title: 'Holiday',
          date: dateStr,
          color: 'blue',
        });
      }
    }

    this.calendarEvents = events;
    console.log(this.calendarEvents);
  }

  getBusinessHours() {
    // Specify business hours (working hours) and non-working days
    return {
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday are working days
      startTime: '08:00', // Start time
      endTime: '17:00', // End time
    };
  }

  getClassList(): void {
    this.commonService.getAllClass().subscribe({
      next: (response: any) => {
        this.classList = response.data;
      },
    });
  }

  getStudentList(id: number): void {
    this.classId = id;
    this.adminService.getStudentListForAttendance(this.classId).subscribe({
      next: (response: any) => {
        this.classStudentList = response.data;
        console.log(this.classStudentList);
      },
    });
  }
}
