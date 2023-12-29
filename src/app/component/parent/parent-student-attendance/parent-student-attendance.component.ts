import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StudentAttendanceResponse } from 'src/app/model/response/student-attendance-response';
import { ParentService } from 'src/app/service/parent.service';

@Component({
  selector: 'app-parent-student-attendance',
  templateUrl: './parent-student-attendance.component.html',
  styleUrls: ['./parent-student-attendance.component.css'],
})
export class ParentStudentAttendanceComponent {
  calendarEvents: any = [];
  currentMonth: number = 0;
  currentYear: number = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    // businessHours: this.getBusinessHours(),
  };

  constructor(private parentService: ParentService) {}

  ngOnInit() {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.updateCalendar();
  }

  updateCalendar() {
    this.parentService.getAttendanceData().subscribe({
      next: (response: any) => {
        let studentAttendanceData: StudentAttendanceResponse = response.data;
        if (studentAttendanceData !== null) {
          console.log(studentAttendanceData.date);
          this.generateCalendarEvents(
            studentAttendanceData.date,
            new Date(studentAttendanceData.joinedDate),
            new Date()
          );
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
}
