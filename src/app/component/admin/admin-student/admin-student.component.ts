import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { CLassList } from 'src/app/model/class-list';
import { AdminStudentApprove } from 'src/app/model/request/admin-student-approve';
import { AdminStudentResponse } from 'src/app/model/response/admin-student-response';
import { StudentDetailReport } from 'src/app/model/student-detail-report';
import { StudentStatus } from 'src/app/model/student-status';
import { AdminService } from 'src/app/service/admin.service';
import { CommonService } from 'src/app/service/common.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReportGeneratorService } from 'src/app/service/report-generator.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css'],
})
export class AdminStudentComponent implements OnInit {
  pdf: any;
  studentDetails: AdminStudentResponse[] = [];
  studentUpdateList: AdminStudentResponse[] = [];

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

  listSize: number[] = [1, 2, 10, 20, 30, 50];

  studentStatus: StudentStatus[] = [];

  classList: CLassList[] = [];
  currentPage: number = 1;
  listPerTime: number = 10;
  totalPages: number = 1;
  pageArray: any[] = [];
  pageSize: number = 3;
  visiblePage: (number | '...')[] = [];
  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private reportGeneratorService: ReportGeneratorService
  ) {}

  options: AnimationOptions = {
    path: '/assets/noDataFound.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  ngOnInit(): void {
    this.getAllStudent();
    this.getAllClassList();
    this.getAllStatus();
  }

  getAllStudent(): void {
    this.adminService.getAllStudents().subscribe({
      next: (response: any) => {
        let studentDetail: AdminStudentResponse[] = response.data;
        if (studentDetail.length > 0) {
          this.studentDetails = studentDetail;

          this.totalPages = Math.ceil(
            this.studentDetails.length / this.listPerTime
          );
          this.changeVisiblePage();
          this.updatePageContent();
        }
      },
    });
  }

  getAllClassList(): void {
    this.commonService.getAllClass().subscribe({
      next: (response: any) => {
        this.classList = response.data;
      },
    });
  }

  getAllStatus(): void {
    this.commonService.getAllStudentStatus().subscribe({
      next: (response: any) => {
        this.studentStatus = response.data;
      },
    });
  }

  aproveStudent(
    studentUserId: number,
    ClassId: number,
    studentStatusId: number
  ): void {
    let studentApprove: AdminStudentApprove = {
      studentUserId: studentUserId,
      classId: ClassId,
      studentStatusId: studentStatusId,
    };
    this.adminService.approveStudent(studentApprove).subscribe({
      next: (response: any) => {
        this.getAllStudent();
      },
    });
  }

  updatePageContent(): void {
    let startIndex: number = (this.currentPage - 1) * this.listPerTime;
    let endIndex: number = startIndex + this.listPerTime;
    this.studentUpdateList = this.studentDetails.slice(startIndex, endIndex);
    this.sortData();
  }

  setListOfItems(): void {
    this.getAllStudent();
  }
  pendingStudentList(): void {
    this.studentUpdateList = this.studentDetails.filter((student) => {
      student.studentStatusId == 1;
    });
    this.sortData();
  }

  withdrawStudentList(): void {
    this.studentUpdateList = this.studentDetails.filter((student) => {
      student.studentStatusId == 4;
    });
    this.sortData();
  }

  graduatedStudentList(): void {
    this.studentUpdateList = this.studentDetails.filter((student) => {
      student.studentStatusId == 3;
    });
    this.sortData();
  }

  activeStudentList(): void {
    this.studentUpdateList = this.studentDetails.filter((student) => {
      student.studentStatusId == 2;
    });
  }

  changeVisiblePage(): void {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pageSize = this.pageSize;
    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= pageSize) {
      this.visiblePage = totalPagesArray;
    }

    const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const endPage = Math.min(totalPages, startPage + pageSize - 1);

    let visiblePages: (number | '...')[] = [];

    if (startPage > 1) {
      visiblePages.push(1, '...');
    }

    visiblePages = visiblePages.concat(
      totalPagesArray.slice(startPage - 1, endPage)
    );

    if (endPage < totalPages) {
      visiblePages.push('...', totalPages);
    }
    this.visiblePage = visiblePages;
  }

  changePage(page: number | '...'): void {
    if (page !== '...') {
      this.currentPage = page as number;
    }
    this.updatePageContent();
  }

  search(event: any): void {
    if (event.target.value == '') {
      this.getAllStudent();
    }
    this.studentUpdateList = this.studentDetails.filter(
      (student) =>
        student.studentUserId == event.target.value ||
        student.firstName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        student.className
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
  }

  downloadReport(userId: number): void {
    this.reportGeneratorService.getStudentDetailReport(userId);
  }

  sortData(): void {
    this.studentUpdateList.sort((a, b) => {
      let firstNameA = a.firstName.toUpperCase();
      let firstNameB = b.firstName.toUpperCase();
      if (firstNameA < firstNameB) {
        return -1;
      }
      if (firstNameA > firstNameB) {
        return 1;
      }

      return 0;
    });
  }
}
