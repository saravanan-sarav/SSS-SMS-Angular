import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCreateClassRoom } from 'src/app/model/response/admin-create-class-room';
import { Standard } from 'src/app/model/standard';
import { TeacherList } from 'src/app/model/teacher-list';
import { AdminService } from 'src/app/service/admin.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-admin-create-classroom',
  templateUrl: './admin-create-classroom.component.html',
  styleUrls: ['./admin-create-classroom.component.css'],
})
export class AdminCreateClassroomComponent implements OnInit {
  classStandard: Standard[] = [];
  minValue: number = 0;

  AllclassStandard: Standard[] = [];
  createClassroom: AdminCreateClassRoom = {
    classRoomId: 0,
    standardId: 0,
    teacherUserId: 0,
    tamilTeacherUserId: 0,
    englishTeacherUserId: 0,
    mathsTeacherUserId: 0,
    scienceTeacherUserId: 0,
    socialTeacherUserId: 0,
  };

  allTeacherList: TeacherList[] = [];
  classTeacher: TeacherList[] = [];
  tamilTeacher: TeacherList[] = [];
  englishTeacher: TeacherList[] = [];
  mathsTeacher: TeacherList[] = [];
  scienceTeacher: TeacherList[] = [];
  socialTeacher: TeacherList[] = [];

  selectedTeacher: TeacherList = {
    teacherUserId: 0,
    teacherName: '',
    teacherSubjectId: 0,
    classId: 0,
    standardId: 0,
  };

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStandardList();
    this.getAllTeacherList();
  }

  getStandardList(): void {
    this.commonService.getAllStandard().subscribe({
      next: (response: any) => {
        this.AllclassStandard = response.data;
        this.filterClassStandard();
      },
    });
  }

  filterClassStandard(): void {
    let notNull = this.allTeacherList
      .map((a) => a.standardId)
      .filter((a) => a !== null);
    console.log(notNull);

    let all = this.AllclassStandard.map((a) => a.standardId);

    let f: number[] = [];
    for (let a of all) {
      if (!notNull.includes(a)) {
        f.push(a);
      }
    }

    this.classStandard = this.AllclassStandard.filter((a) =>
      f.includes(a.standardId)
    );

    // for (let teacher of this.allTeacherList) {
    //   if (teacher.standardId !== null) {
    //     for (let std of this.AllclassStandard) {
    //       if (std.standardId !== teacher.standardId) {
    //         if (!this.classStandard.includes(std)) this.classStandard.push(std);
    //       }
    //     }
    //   }
    // }
    // let finalT: [] = [];

    // let ab: number[] = this.classStandard.map((c) => c.standardId);

    // for (let teacher of this.allTeacherList) {
    //   if (teacher.standardId) {
    //     if (!ab.includes(teacher.standardId)) {
    //       finalT.push(
    //         this.allTeacherList.find(
    //           (t) => t.standardId === teacher.standardId
    //         )!
    //       );
    //     }
    //   }
    // }

    // this.allTeacherList.forEach((teacher) => {
    //   if (teacher.standardId !== null) {
    //     this.AllclassStandard.forEach((standard) => {
    //       if (standard.standardId === teacher.standardId) {

    //       }
    //     });
    //   }
    // });
  }

  getAllTeacherList(): void {
    this.adminService.getAllTeacherList().subscribe({
      next: (response: any) => {
        this.allTeacherList = response.data;
        this.getClassTeacherList();
        this.getTamilTeacherList();
        this.getEnglishTeacherList();
        this.getMathsTeacherList();
        this.getScienceTeacherList();
        this.getSocialTeacherList();
      },
    });
  }

  getClassTeacherList(): void {
    this.classTeacher = this.allTeacherList.filter(
      (teacher) => teacher.classId === null
    );
  }

  getTamilTeacherList(): void {
    this.tamilTeacher = this.allTeacherList.filter(
      (tt) => tt.teacherSubjectId === 1
    );
  }

  getEnglishTeacherList(): void {
    this.englishTeacher = this.allTeacherList.filter(
      (tt) => tt.teacherSubjectId === 2
    );
  }

  getMathsTeacherList(): void {
    this.mathsTeacher = this.allTeacherList.filter(
      (tt) => tt.teacherSubjectId === 3
    );
  }

  getScienceTeacherList(): void {
    this.scienceTeacher = this.allTeacherList.filter(
      (tt) => tt.teacherSubjectId === 4
    );
  }

  getSocialTeacherList(): void {
    this.socialTeacher = this.allTeacherList.filter(
      (tt) => tt.teacherSubjectId === 5
    );
  }

  createClass(addClassRoom: NgForm): void {
    let createClassRoomRequest: AdminCreateClassRoom = addClassRoom.value;
    console.log(createClassRoomRequest);

    this.adminService.createClassroom(createClassRoomRequest).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.router.navigate(['/admin/home/classes'], { replaceUrl: true });
      },
    });
  }

  assignToSubject(): void {
    this.selectedTeacher = this.classTeacher.find(
      (ct) => ct.teacherUserId === this.createClassroom.teacherUserId
    )!;
    if (this.selectedTeacher.teacherSubjectId == 1) {
      this.createClassroom.tamilTeacherUserId =
        this.selectedTeacher.teacherUserId;
    } else if (this.selectedTeacher.teacherSubjectId == 2) {
      this.createClassroom.englishTeacherUserId =
        this.selectedTeacher.teacherUserId;
    } else if (this.selectedTeacher.teacherSubjectId == 3) {
      this.createClassroom.mathsTeacherUserId =
        this.selectedTeacher.teacherUserId;
    } else if (this.selectedTeacher.teacherSubjectId == 4) {
      this.createClassroom.scienceTeacherUserId =
        this.selectedTeacher.teacherUserId;
    } else if (this.selectedTeacher.teacherSubjectId == 5) {
      this.createClassroom.socialTeacherUserId =
        this.selectedTeacher.teacherUserId;
    }
  }
}
