import { Injectable } from '@angular/core';
import { StudentDetailReport } from '../model/student-detail-report';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class ReportGeneratorService {
  pdf: any;
  studentDetailReport: StudentDetailReport = {
    name: '',
    className: '',
    classId: 0,
    status: '',
    joinedDate: '',
    studentId: 0,
    firstName: '',
    lastName: '',
    gender: '',
    motherName: '',
    fatherName: '',
    motherPhoneNumber: '',
    fatherPhoneNumber: '',
    motherOccupation: '',
    fatherOccupation: '',
    doorNumber: '',
    street: '',
    addressLine: '',
    city: '',
    state: '',
    pinCode: '',
    assignmentsAssigned: 0,
    assignmentsCompleted: 0,
    assignmentsPassed: 0,
  };

  constructor(private adminService: AdminService) {}

  drawLine(pdf: any, x1: number, y1: number, x2: number, y2: number): void {
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(128, 128, 128);
    pdf.line(x1, y1, x2, y2);
  }

  addPageContent(pdf: any) {
    pdf.setFontSize(10);
    pdf.text('Page ' + pdf.internal.getNumberOfPages(), 100, 285);
  }

  addSection(pdf: any, title: string, yPos: number, data: any[][]): number {
    pdf.setFontSize(16);
    pdf.text(title, 15, yPos + 5);
    pdf.autoTable({
      startY: yPos + 10,
      margin: { top: 10 },
      styles: {
        fontSize: 12,
        cellPadding: 2,
      },
      head: [['Fields', 'Details']],
      body: data,
    });
    return pdf.autoTable.previous.finalY;
  }

  downloadPDF(): void {
    let date = new Date();
    this.pdf = new jsPDF.default();
    var fontSize = 12;
    this.pdf.setFontSize(fontSize);

    let yPos = 20;
    this.pdf.setFontSize(24);
    this.pdf.text('Student Detail Report', 65, yPos);
    this.pdf.setFontSize(16);

    this.pdf.text('Basic Information :', 15, yPos + 20);
    this.pdf.text(
      `Student ID: ${this.studentDetailReport.studentId}`,
      160,
      yPos + 20
    );

    yPos += yPos + 15;
    this.pdf.setFontSize(12);
    this.pdf.text(
      `First Name: ${this.studentDetailReport.firstName}`,
      20,
      yPos
    );
    this.pdf.text(`Last Name: ${this.studentDetailReport.lastName}`, 80, yPos);
    this.pdf.text(`Status: ${this.studentDetailReport.status}`, 150, yPos);
    yPos += 10;
    this.pdf.text(`Class: ${this.studentDetailReport.className}`, 20, yPos);
    this.pdf.text(`Class ID: ${this.studentDetailReport.classId}`, 80, yPos);

    this.pdf.text(
      `Joined Date: ${this.studentDetailReport.joinedDate}`,
      150,
      yPos
    );
    yPos += 5;

    this.drawLine(this.pdf, 10, yPos + 5, 200, yPos + 5);

    yPos = this.addSection(this.pdf, 'Personal Details', yPos + 10, [
      ['First Name', this.studentDetailReport.firstName],
      ['Last Name', this.studentDetailReport.lastName],
      ['Gender', this.studentDetailReport.gender],
      ['Joined Date', this.studentDetailReport.joinedDate],
    ]);

    this.drawLine(this.pdf, 10, yPos + 5, 200, yPos + 5);

    yPos = this.addSection(this.pdf, 'Parent Details', yPos + 10, [
      ['Mother Name', this.studentDetailReport.motherName],
      ['Father Name', this.studentDetailReport.fatherName],
      ['Mother Phone Number', this.studentDetailReport.motherPhoneNumber],
      ['Father Phone Number', this.studentDetailReport.fatherPhoneNumber],
      ['Mother Occupation', this.studentDetailReport.motherOccupation],
      ['Father Occupation', this.studentDetailReport.fatherOccupation],
    ]);

    this.drawLine(this.pdf, 10, yPos + 5, 200, yPos + 5);

    yPos = this.addSection(this.pdf, 'Address', yPos + 10, [
      ['Door Number', this.studentDetailReport.doorNumber],
      ['Street', this.studentDetailReport.street],
      ['Address Line', this.studentDetailReport.addressLine],
      ['City', this.studentDetailReport.city],
      ['State', this.studentDetailReport.state],
      ['PinCode', this.studentDetailReport.pinCode],
    ]);

    this.drawLine(this.pdf, 10, yPos + 5, 200, yPos + 5);

    yPos = this.addSection(this.pdf, 'Academic Details', yPos + 10, [
      ['Student Class Name', this.studentDetailReport.className],
      ['Student Status', this.studentDetailReport.status],
      [
        'Assignment Assigned',
        String(this.studentDetailReport.assignmentsAssigned),
      ],
      [
        'Assignment Completed',
        String(this.studentDetailReport.assignmentsCompleted),
      ],
      ['Assignment Passed', String(this.studentDetailReport.assignmentsPassed)],
    ]);

    this.drawLine(this.pdf, 10, yPos + 5, 200, yPos + 5);

    this.addPageContent(this.pdf);
    this.pdf.text(
      `Generated Date :${date.toLocaleDateString()}`,
      10,
      yPos + 20
    );
    this.pdf.text(
      `Generated Time :${date.toLocaleTimeString()}`,
      10,
      yPos + 25
    );
    this.pdf.save(
      `${this.studentDetailReport.firstName}_${
        this.studentDetailReport.studentId
      }_Report(${date.toDateString()})`
    );
  }

  getStudentDetailReport(userId: number): void {
    this.adminService.getStudentReport(userId).subscribe({
      next: (response: any) => {
        this.studentDetailReport = response.data;
        this.downloadPDF();
      },
    });
  }
}
