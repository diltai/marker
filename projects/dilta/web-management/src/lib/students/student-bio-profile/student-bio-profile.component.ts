import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { EntityNames, ModelOperations, schoolClassValueToKey, Student } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { AbstractTransportService } from '@dilta/web-transport';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';

const failedStudentDeleteError = new Error(
  'error while deleting the student details'
);

@Component({
  selector: 'admin-ui-student-bio-profile',
  templateUrl: './student-bio-profile.component.html',
  styleUrls: ['./student-bio-profile.component.scss']
})
export class StudentBioProfileComponent implements OnInit {
  /** StudentBiodata */
  public StudentBio$: Observable<Student>;

  constructor(
    private store: Store<any>,
    private actr: ActivatedRoute,
    private route: RouterDirection,
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) {}

  editStudent() {
    this.StudentBio$.pipe(first()).subscribe(student =>
      this.route.editStudent(student)
    );
  }

  viewParent() {
    this.StudentBio$.pipe(first()).subscribe(student =>
      this.route.viewParent(student.parentPhone as string)
    );
  }

  deleteStudent() {
    this.actr.params
      .pipe(
        exhaustMap(params =>
          this.transport.modelAction<boolean>(
            EntityNames.Student,
            ModelOperations.Delete,
            params.id
          )
        ),
        first(),
        map(res => {
          if (res) {
            return res;
          }
          throw failedStudentDeleteError;
        })
      )
      .subscribe(
        res => {
          this.util.success(
            'Student Details',
            'successfully deleted student details'
          );
          this.deleteStudent();
        },
        err => this.util.error(err)
      );
  }

  /** gets the Student biodata */
  getBiodata(): Observable<Student> {
    return this.actr.params.pipe(
      exhaustMap(({ id }) =>
        this.transport.modelAction<Student>(
          EntityNames.Student,
          ModelOperations.Retrieve,
          {
            id
          }
        )
      ),
      map(student =>
        Object.assign(student, {
          dob: format(new Date(Number(student.dob)), 'yyyy-mm-dd'),
          class: schoolClassValueToKey(student.class)
        })
      )
    );
  }

  ngOnInit() {
    this.StudentBio$ = this.getBiodata();
  }
}
